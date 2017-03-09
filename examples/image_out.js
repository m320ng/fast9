var fast9 = require('../fast9');
var fs = require('fs');
var PNG = require('pngjs').PNG;

var pngfile = 'example.png';

fs.createReadStream(pngfile)
	.pipe(new PNG({
		filterType: -1,
	}))
	.on('parsed', function() {
		var data = this.data;
		var width = this.width;
		var height = this.height;
		
		// data is 'RGBA buffer'

		// make grayscale buffer (byte array)
		var gs = new Array(width * height);
		//var gs = new Uint8Array(width * height); //es6 
		var gs_index = 0;
		for (var y=0; y<height; y++) {
			for (var x=0; x<width; x++) {
				var idx = (width * y + x) << 2;
				// data[idx] is red
				// data[idx+1] is green
				// data[idx+2] is blue
				// data[idx+3] is alpha
				var gray = parseInt(data[idx] * 0.3 + data[idx+1] * 0.6 + data[idx+2] * 0.11);
				//var gray = (data[idx] >> 2) + (data[idx+1] >> 1) + (data[idx+2] >> 2); // faster
				if (gray > 0xFF) gray = 0xFF;
				gs[gs_index++] = gray;
			}
		}

		var threshold = 20;
		var corners = fast9.detect(gs, width, height, threshold, true);
		
		// sort by score
		//corners.sort((a,b)=>b.score-a.score); //lamda
		corners.sort(function(a,b) {
			return b.score-a.score;
		});

		// draw
		var dst = new PNG({width: width, height: height});
		
		// make grayscale to RGBA
		for (var y=0; y<height; y++) {
			for (var x=0; x<width; x++) {
				var idx = (width * y + x) << 2;
				var gray = gs[width * y + x];
				dst.data[idx] = gray;
				dst.data[idx+1] = gray;
				dst.data[idx+2] = gray;
				dst.data[idx+3] = 0xFF;
			}
		}
		// if you want the original image
		//dst.data = data;

		// draw corner
		corners.slice(0, 500).forEach(function(kp) {
		//corners.forEach(function(kp) { // all corners
			var SPOT_SIZE = 1;
			for (var y=kp.y-SPOT_SIZE; y<=kp.y+SPOT_SIZE; y++) {
				for (var x=kp.x-SPOT_SIZE; x<=kp.x+SPOT_SIZE; x++) {
					var idx = (width * y + x) << 2;
					dst.data[idx] = 0xFF;
					dst.data[idx+1] = 0;
					dst.data[idx+2] = 0;
					dst.data[idx+3] = 0xFF;
				}
			}
		});

		// save png
		dst.pack()
			.pipe(fs.createWriteStream('corner.png'))
			.on('finish', function() {
				console.log('complete');
			});
		
	})	
	.on('error', function(e) {
		console.log(e);
	});	
