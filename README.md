
# Fast9 -- FAST Corner Detection

Fast9 is a pure javascript implementation of 'FAST Corner Detection'.

This is port of 'C soure code' to JavaScript.

The original C source code can be found [here](https://github.com/edrosten/fast-C-src).


## Install
```
npm install pngjs
```

## Usage

### fast9.detect(im, width, height, threshold, [nonmax])

Params
```
im : grayscale byte array
width : image width
height : image height
threshold : threshold
nonmax : non-maximum suppression
```

Result
```
Array
{
	x:x position,
	y:y position,
	score:corner score
}
```

Source
```javascript
// detect corners
var threshold = 20;
var corners = fast9.detect(im, width, height, threshold, true);
```

## Example

```javascript
var fast9 = require('fast9');
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

		// print corners
		console.log(corners.slice(0, 100));

	})	
	.on('error', function(e) {
		console.log(e);
	});	
```


## License

BSD license
