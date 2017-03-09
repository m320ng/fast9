module.exports = {
	detect: detect,

	fast9_detect: fast9_detect,
	fast9_score: fast9_score,
	nonmax_suppression: nonmax_suppression
};

/*
This is port of 'FAST Corner Detection' to JavaScript.
https://www.edwardrosten.com/work/fast.html
https://github.com/edrosten/fast-C-src 
- fast9.c 
- nonmax.c
*/

function detect(im, width, height, threshold, nonmax) {
	var corners = fast9_detect(im, width, height, threshold);
	var scores = fast9_score(im, width, height, corners, threshold);
	if (nonmax) {
		var nonmax = nonmax_suppression(corners, scores);
		return nonmax;
	} else {
		for (var i=0; i<corners.length; i++) {
			corners[i].score = scores[i];
		}
		return corners;
	}
}

/* fast9.c */

function fast9_detect(im, xsize, ysize, b)
{
	var corners = [];
	var rsize=512;
	var pixel = new Array(16);
	var x, y;
	var stride = xsize;

	pixel[0] = 0 + stride * 3;
	pixel[1] = 1 + stride * 3;
	pixel[2] = 2 + stride * 2;
	pixel[3] = 3 + stride * 1;
	pixel[4] = 3 + stride * 0;
	pixel[5] = 3 + stride * -1;
	pixel[6] = 2 + stride * -2;
	pixel[7] = 1 + stride * -3;
	pixel[8] = 0 + stride * -3;
	pixel[9] = -1 + stride * -3;
	pixel[10] = -2 + stride * -2;
	pixel[11] = -3 + stride * -1;
	pixel[12] = -3 + stride * 0;
	pixel[13] = -3 + stride * 1;
	pixel[14] = -2 + stride * 2;
	pixel[15] = -1 + stride * 3;

	for(y=3; y < ysize - 3; y++) {
		for(x=3; x < xsize - 3; x++) {
			var idx = y*stride + x;
		
			var cb = im[idx] + b;
			var c_b= im[idx] - b;

        if(im[idx + pixel[0]] > cb)
         if(im[idx + pixel[1]] > cb)
          if(im[idx + pixel[2]] > cb)
           if(im[idx + pixel[3]] > cb)
            if(im[idx + pixel[4]] > cb)
             if(im[idx + pixel[5]] > cb)
              if(im[idx + pixel[6]] > cb)
               if(im[idx + pixel[7]] > cb)
                if(im[idx + pixel[8]] > cb)
                 {}
                else
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  continue;
               else if(im[idx + pixel[7]] < c_b)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  continue;
                else if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[8]] < c_b)
                  if(im[idx + pixel[9]] < c_b)
                   if(im[idx + pixel[10]] < c_b)
                    if(im[idx + pixel[11]] < c_b)
                     if(im[idx + pixel[12]] < c_b)
                      if(im[idx + pixel[13]] < c_b)
                       if(im[idx + pixel[15]] < c_b)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  continue;
                else
                 continue;
              else if(im[idx + pixel[6]] < c_b)
               if(im[idx + pixel[15]] > cb)
                if(im[idx + pixel[13]] > cb)
                 if(im[idx + pixel[14]] > cb)
                  {}
                 else
                  continue;
                else if(im[idx + pixel[13]] < c_b)
                 if(im[idx + pixel[7]] < c_b)
                  if(im[idx + pixel[8]] < c_b)
                   if(im[idx + pixel[9]] < c_b)
                    if(im[idx + pixel[10]] < c_b)
                     if(im[idx + pixel[11]] < c_b)
                      if(im[idx + pixel[12]] < c_b)
                       if(im[idx + pixel[14]] < c_b)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                if(im[idx + pixel[7]] < c_b)
                 if(im[idx + pixel[8]] < c_b)
                  if(im[idx + pixel[9]] < c_b)
                   if(im[idx + pixel[10]] < c_b)
                    if(im[idx + pixel[11]] < c_b)
                     if(im[idx + pixel[12]] < c_b)
                      if(im[idx + pixel[13]] < c_b)
                       if(im[idx + pixel[14]] < c_b)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  continue;
                else
                 continue;
               else if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[7]] < c_b)
                 if(im[idx + pixel[8]] < c_b)
                  if(im[idx + pixel[9]] < c_b)
                   if(im[idx + pixel[10]] < c_b)
                    if(im[idx + pixel[11]] < c_b)
                     if(im[idx + pixel[12]] < c_b)
                      if(im[idx + pixel[14]] < c_b)
                       if(im[idx + pixel[15]] < c_b)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else if(im[idx + pixel[5]] < c_b)
              if(im[idx + pixel[14]] > cb)
               if(im[idx + pixel[12]] > cb)
                if(im[idx + pixel[13]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      if(im[idx + pixel[10]] > cb)
                       if(im[idx + pixel[11]] > cb)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 continue;
               else if(im[idx + pixel[12]] < c_b)
                if(im[idx + pixel[6]] < c_b)
                 if(im[idx + pixel[7]] < c_b)
                  if(im[idx + pixel[8]] < c_b)
                   if(im[idx + pixel[9]] < c_b)
                    if(im[idx + pixel[10]] < c_b)
                     if(im[idx + pixel[11]] < c_b)
                      if(im[idx + pixel[13]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else if(im[idx + pixel[14]] < c_b)
               if(im[idx + pixel[7]] < c_b)
                if(im[idx + pixel[8]] < c_b)
                 if(im[idx + pixel[9]] < c_b)
                  if(im[idx + pixel[10]] < c_b)
                   if(im[idx + pixel[11]] < c_b)
                    if(im[idx + pixel[12]] < c_b)
                     if(im[idx + pixel[13]] < c_b)
                      if(im[idx + pixel[6]] < c_b)
                       {}
                      else
                       if(im[idx + pixel[15]] < c_b)
                        {}
                       else
                        continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               if(im[idx + pixel[6]] < c_b)
                if(im[idx + pixel[7]] < c_b)
                 if(im[idx + pixel[8]] < c_b)
                  if(im[idx + pixel[9]] < c_b)
                   if(im[idx + pixel[10]] < c_b)
                    if(im[idx + pixel[11]] < c_b)
                     if(im[idx + pixel[12]] < c_b)
                      if(im[idx + pixel[13]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      if(im[idx + pixel[10]] > cb)
                       if(im[idx + pixel[11]] > cb)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 continue;
               else
                continue;
              else if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[7]] < c_b)
                if(im[idx + pixel[8]] < c_b)
                 if(im[idx + pixel[9]] < c_b)
                  if(im[idx + pixel[10]] < c_b)
                   if(im[idx + pixel[11]] < c_b)
                    if(im[idx + pixel[13]] < c_b)
                     if(im[idx + pixel[14]] < c_b)
                      if(im[idx + pixel[6]] < c_b)
                       {}
                      else
                       if(im[idx + pixel[15]] < c_b)
                        {}
                       else
                        continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else if(im[idx + pixel[4]] < c_b)
             if(im[idx + pixel[13]] > cb)
              if(im[idx + pixel[11]] > cb)
               if(im[idx + pixel[12]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      if(im[idx + pixel[10]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      if(im[idx + pixel[10]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                continue;
              else if(im[idx + pixel[11]] < c_b)
               if(im[idx + pixel[5]] < c_b)
                if(im[idx + pixel[6]] < c_b)
                 if(im[idx + pixel[7]] < c_b)
                  if(im[idx + pixel[8]] < c_b)
                   if(im[idx + pixel[9]] < c_b)
                    if(im[idx + pixel[10]] < c_b)
                     if(im[idx + pixel[12]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else if(im[idx + pixel[13]] < c_b)
              if(im[idx + pixel[7]] < c_b)
               if(im[idx + pixel[8]] < c_b)
                if(im[idx + pixel[9]] < c_b)
                 if(im[idx + pixel[10]] < c_b)
                  if(im[idx + pixel[11]] < c_b)
                   if(im[idx + pixel[12]] < c_b)
                    if(im[idx + pixel[6]] < c_b)
                     if(im[idx + pixel[5]] < c_b)
                      {}
                     else
                      if(im[idx + pixel[14]] < c_b)
                       {}
                      else
                       continue;
                    else
                     if(im[idx + pixel[14]] < c_b)
                      if(im[idx + pixel[15]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              if(im[idx + pixel[5]] < c_b)
               if(im[idx + pixel[6]] < c_b)
                if(im[idx + pixel[7]] < c_b)
                 if(im[idx + pixel[8]] < c_b)
                  if(im[idx + pixel[9]] < c_b)
                   if(im[idx + pixel[10]] < c_b)
                    if(im[idx + pixel[11]] < c_b)
                     if(im[idx + pixel[12]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      if(im[idx + pixel[10]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      if(im[idx + pixel[10]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                continue;
              else
               continue;
             else if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[7]] < c_b)
               if(im[idx + pixel[8]] < c_b)
                if(im[idx + pixel[9]] < c_b)
                 if(im[idx + pixel[10]] < c_b)
                  if(im[idx + pixel[12]] < c_b)
                   if(im[idx + pixel[13]] < c_b)
                    if(im[idx + pixel[6]] < c_b)
                     if(im[idx + pixel[5]] < c_b)
                      {}
                     else
                      if(im[idx + pixel[14]] < c_b)
                       {}
                      else
                       continue;
                    else
                     if(im[idx + pixel[14]] < c_b)
                      if(im[idx + pixel[15]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
           else if(im[idx + pixel[3]] < c_b)
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               continue;
             else
              continue;
            else if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[7]] < c_b)
              if(im[idx + pixel[8]] < c_b)
               if(im[idx + pixel[9]] < c_b)
                if(im[idx + pixel[11]] < c_b)
                 if(im[idx + pixel[6]] < c_b)
                  if(im[idx + pixel[5]] < c_b)
                   if(im[idx + pixel[4]] < c_b)
                    {}
                   else
                    if(im[idx + pixel[12]] < c_b)
                     if(im[idx + pixel[13]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                  else
                   if(im[idx + pixel[12]] < c_b)
                    if(im[idx + pixel[13]] < c_b)
                     if(im[idx + pixel[14]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                 else
                  if(im[idx + pixel[12]] < c_b)
                   if(im[idx + pixel[13]] < c_b)
                    if(im[idx + pixel[14]] < c_b)
                     if(im[idx + pixel[15]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
            else
             continue;
           else
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     if(im[idx + pixel[9]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               continue;
             else
              continue;
            else if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[7]] < c_b)
              if(im[idx + pixel[8]] < c_b)
               if(im[idx + pixel[9]] < c_b)
                if(im[idx + pixel[11]] < c_b)
                 if(im[idx + pixel[12]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[5]] < c_b)
                    if(im[idx + pixel[4]] < c_b)
                     {}
                    else
                     if(im[idx + pixel[13]] < c_b)
                      {}
                     else
                      continue;
                   else
                    if(im[idx + pixel[13]] < c_b)
                     if(im[idx + pixel[14]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                  else
                   if(im[idx + pixel[13]] < c_b)
                    if(im[idx + pixel[14]] < c_b)
                     if(im[idx + pixel[15]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
            else
             continue;
          else if(im[idx + pixel[2]] < c_b)
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              continue;
            else
             continue;
           else if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[7]] < c_b)
             if(im[idx + pixel[8]] < c_b)
              if(im[idx + pixel[10]] < c_b)
               if(im[idx + pixel[6]] < c_b)
                if(im[idx + pixel[5]] < c_b)
                 if(im[idx + pixel[4]] < c_b)
                  if(im[idx + pixel[3]] < c_b)
                   {}
                  else
                   if(im[idx + pixel[11]] < c_b)
                    if(im[idx + pixel[12]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                 else
                  if(im[idx + pixel[11]] < c_b)
                   if(im[idx + pixel[12]] < c_b)
                    if(im[idx + pixel[13]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[11]] < c_b)
                  if(im[idx + pixel[12]] < c_b)
                   if(im[idx + pixel[13]] < c_b)
                    if(im[idx + pixel[14]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[11]] < c_b)
                 if(im[idx + pixel[12]] < c_b)
                  if(im[idx + pixel[13]] < c_b)
                   if(im[idx + pixel[14]] < c_b)
                    if(im[idx + pixel[15]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               continue;
             else
              continue;
            else
             continue;
           else
            continue;
          else
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    if(im[idx + pixel[8]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              continue;
            else
             continue;
           else if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[7]] < c_b)
             if(im[idx + pixel[8]] < c_b)
              if(im[idx + pixel[10]] < c_b)
               if(im[idx + pixel[11]] < c_b)
                if(im[idx + pixel[6]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[4]] < c_b)
                   if(im[idx + pixel[3]] < c_b)
                    {}
                   else
                    if(im[idx + pixel[12]] < c_b)
                     {}
                    else
                     continue;
                  else
                   if(im[idx + pixel[12]] < c_b)
                    if(im[idx + pixel[13]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                 else
                  if(im[idx + pixel[12]] < c_b)
                   if(im[idx + pixel[13]] < c_b)
                    if(im[idx + pixel[14]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[12]] < c_b)
                  if(im[idx + pixel[13]] < c_b)
                   if(im[idx + pixel[14]] < c_b)
                    if(im[idx + pixel[15]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                continue;
              else
               continue;
             else
              continue;
            else
             continue;
           else
            continue;
         else if(im[idx + pixel[1]] < c_b)
          if(im[idx + pixel[8]] > cb)
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[2]] > cb)
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             continue;
           else
            continue;
          else if(im[idx + pixel[8]] < c_b)
           if(im[idx + pixel[7]] < c_b)
            if(im[idx + pixel[9]] < c_b)
             if(im[idx + pixel[6]] < c_b)
              if(im[idx + pixel[5]] < c_b)
               if(im[idx + pixel[4]] < c_b)
                if(im[idx + pixel[3]] < c_b)
                 if(im[idx + pixel[2]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[10]] < c_b)
                   if(im[idx + pixel[11]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[10]] < c_b)
                  if(im[idx + pixel[11]] < c_b)
                   if(im[idx + pixel[12]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[10]] < c_b)
                 if(im[idx + pixel[11]] < c_b)
                  if(im[idx + pixel[12]] < c_b)
                   if(im[idx + pixel[13]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[10]] < c_b)
                if(im[idx + pixel[11]] < c_b)
                 if(im[idx + pixel[12]] < c_b)
                  if(im[idx + pixel[13]] < c_b)
                   if(im[idx + pixel[14]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[10]] < c_b)
               if(im[idx + pixel[11]] < c_b)
                if(im[idx + pixel[12]] < c_b)
                 if(im[idx + pixel[13]] < c_b)
                  if(im[idx + pixel[14]] < c_b)
                   if(im[idx + pixel[15]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             continue;
           else
            continue;
          else
           continue;
         else
          if(im[idx + pixel[8]] > cb)
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[15]] > cb)
                  {}
                 else
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[2]] > cb)
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[7]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             continue;
           else
            continue;
          else if(im[idx + pixel[8]] < c_b)
           if(im[idx + pixel[7]] < c_b)
            if(im[idx + pixel[9]] < c_b)
             if(im[idx + pixel[10]] < c_b)
              if(im[idx + pixel[6]] < c_b)
               if(im[idx + pixel[5]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[3]] < c_b)
                  if(im[idx + pixel[2]] < c_b)
                   {}
                  else
                   if(im[idx + pixel[11]] < c_b)
                    {}
                   else
                    continue;
                 else
                  if(im[idx + pixel[11]] < c_b)
                   if(im[idx + pixel[12]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[11]] < c_b)
                  if(im[idx + pixel[12]] < c_b)
                   if(im[idx + pixel[13]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[11]] < c_b)
                 if(im[idx + pixel[12]] < c_b)
                  if(im[idx + pixel[13]] < c_b)
                   if(im[idx + pixel[14]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[11]] < c_b)
                if(im[idx + pixel[12]] < c_b)
                 if(im[idx + pixel[13]] < c_b)
                  if(im[idx + pixel[14]] < c_b)
                   if(im[idx + pixel[15]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              continue;
            else
             continue;
           else
            continue;
          else
           continue;
        else if(im[idx + pixel[0]] < c_b)
         if(im[idx + pixel[1]] > cb)
          if(im[idx + pixel[8]] > cb)
           if(im[idx + pixel[7]] > cb)
            if(im[idx + pixel[9]] > cb)
             if(im[idx + pixel[6]] > cb)
              if(im[idx + pixel[5]] > cb)
               if(im[idx + pixel[4]] > cb)
                if(im[idx + pixel[3]] > cb)
                 if(im[idx + pixel[2]] > cb)
                  {}
                 else
                  if(im[idx + pixel[10]] > cb)
                   if(im[idx + pixel[11]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[10]] > cb)
                  if(im[idx + pixel[11]] > cb)
                   if(im[idx + pixel[12]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[10]] > cb)
                 if(im[idx + pixel[11]] > cb)
                  if(im[idx + pixel[12]] > cb)
                   if(im[idx + pixel[13]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[10]] > cb)
                if(im[idx + pixel[11]] > cb)
                 if(im[idx + pixel[12]] > cb)
                  if(im[idx + pixel[13]] > cb)
                   if(im[idx + pixel[14]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[10]] > cb)
               if(im[idx + pixel[11]] > cb)
                if(im[idx + pixel[12]] > cb)
                 if(im[idx + pixel[13]] > cb)
                  if(im[idx + pixel[14]] > cb)
                   if(im[idx + pixel[15]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             continue;
           else
            continue;
          else if(im[idx + pixel[8]] < c_b)
           if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[2]] < c_b)
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             continue;
           else
            continue;
          else
           continue;
         else if(im[idx + pixel[1]] < c_b)
          if(im[idx + pixel[2]] > cb)
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[7]] > cb)
             if(im[idx + pixel[8]] > cb)
              if(im[idx + pixel[10]] > cb)
               if(im[idx + pixel[6]] > cb)
                if(im[idx + pixel[5]] > cb)
                 if(im[idx + pixel[4]] > cb)
                  if(im[idx + pixel[3]] > cb)
                   {}
                  else
                   if(im[idx + pixel[11]] > cb)
                    if(im[idx + pixel[12]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                 else
                  if(im[idx + pixel[11]] > cb)
                   if(im[idx + pixel[12]] > cb)
                    if(im[idx + pixel[13]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[11]] > cb)
                  if(im[idx + pixel[12]] > cb)
                   if(im[idx + pixel[13]] > cb)
                    if(im[idx + pixel[14]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[11]] > cb)
                 if(im[idx + pixel[12]] > cb)
                  if(im[idx + pixel[13]] > cb)
                   if(im[idx + pixel[14]] > cb)
                    if(im[idx + pixel[15]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               continue;
             else
              continue;
            else
             continue;
           else if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              continue;
            else
             continue;
           else
            continue;
          else if(im[idx + pixel[2]] < c_b)
           if(im[idx + pixel[3]] > cb)
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[7]] > cb)
              if(im[idx + pixel[8]] > cb)
               if(im[idx + pixel[9]] > cb)
                if(im[idx + pixel[11]] > cb)
                 if(im[idx + pixel[6]] > cb)
                  if(im[idx + pixel[5]] > cb)
                   if(im[idx + pixel[4]] > cb)
                    {}
                   else
                    if(im[idx + pixel[12]] > cb)
                     if(im[idx + pixel[13]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                  else
                   if(im[idx + pixel[12]] > cb)
                    if(im[idx + pixel[13]] > cb)
                     if(im[idx + pixel[14]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                 else
                  if(im[idx + pixel[12]] > cb)
                   if(im[idx + pixel[13]] > cb)
                    if(im[idx + pixel[14]] > cb)
                     if(im[idx + pixel[15]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
            else if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               continue;
             else
              continue;
            else
             continue;
           else if(im[idx + pixel[3]] < c_b)
            if(im[idx + pixel[4]] > cb)
             if(im[idx + pixel[13]] > cb)
              if(im[idx + pixel[7]] > cb)
               if(im[idx + pixel[8]] > cb)
                if(im[idx + pixel[9]] > cb)
                 if(im[idx + pixel[10]] > cb)
                  if(im[idx + pixel[11]] > cb)
                   if(im[idx + pixel[12]] > cb)
                    if(im[idx + pixel[6]] > cb)
                     if(im[idx + pixel[5]] > cb)
                      {}
                     else
                      if(im[idx + pixel[14]] > cb)
                       {}
                      else
                       continue;
                    else
                     if(im[idx + pixel[14]] > cb)
                      if(im[idx + pixel[15]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else if(im[idx + pixel[13]] < c_b)
              if(im[idx + pixel[11]] > cb)
               if(im[idx + pixel[5]] > cb)
                if(im[idx + pixel[6]] > cb)
                 if(im[idx + pixel[7]] > cb)
                  if(im[idx + pixel[8]] > cb)
                   if(im[idx + pixel[9]] > cb)
                    if(im[idx + pixel[10]] > cb)
                     if(im[idx + pixel[12]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else if(im[idx + pixel[11]] < c_b)
               if(im[idx + pixel[12]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      if(im[idx + pixel[10]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      if(im[idx + pixel[10]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                continue;
              else
               continue;
             else
              if(im[idx + pixel[5]] > cb)
               if(im[idx + pixel[6]] > cb)
                if(im[idx + pixel[7]] > cb)
                 if(im[idx + pixel[8]] > cb)
                  if(im[idx + pixel[9]] > cb)
                   if(im[idx + pixel[10]] > cb)
                    if(im[idx + pixel[11]] > cb)
                     if(im[idx + pixel[12]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else if(im[idx + pixel[4]] < c_b)
             if(im[idx + pixel[5]] > cb)
              if(im[idx + pixel[14]] > cb)
               if(im[idx + pixel[7]] > cb)
                if(im[idx + pixel[8]] > cb)
                 if(im[idx + pixel[9]] > cb)
                  if(im[idx + pixel[10]] > cb)
                   if(im[idx + pixel[11]] > cb)
                    if(im[idx + pixel[12]] > cb)
                     if(im[idx + pixel[13]] > cb)
                      if(im[idx + pixel[6]] > cb)
                       {}
                      else
                       if(im[idx + pixel[15]] > cb)
                        {}
                       else
                        continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else if(im[idx + pixel[14]] < c_b)
               if(im[idx + pixel[12]] > cb)
                if(im[idx + pixel[6]] > cb)
                 if(im[idx + pixel[7]] > cb)
                  if(im[idx + pixel[8]] > cb)
                   if(im[idx + pixel[9]] > cb)
                    if(im[idx + pixel[10]] > cb)
                     if(im[idx + pixel[11]] > cb)
                      if(im[idx + pixel[13]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else if(im[idx + pixel[12]] < c_b)
                if(im[idx + pixel[13]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      if(im[idx + pixel[10]] < c_b)
                       if(im[idx + pixel[11]] < c_b)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 continue;
               else
                continue;
              else
               if(im[idx + pixel[6]] > cb)
                if(im[idx + pixel[7]] > cb)
                 if(im[idx + pixel[8]] > cb)
                  if(im[idx + pixel[9]] > cb)
                   if(im[idx + pixel[10]] > cb)
                    if(im[idx + pixel[11]] > cb)
                     if(im[idx + pixel[12]] > cb)
                      if(im[idx + pixel[13]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else if(im[idx + pixel[5]] < c_b)
              if(im[idx + pixel[6]] > cb)
               if(im[idx + pixel[15]] < c_b)
                if(im[idx + pixel[13]] > cb)
                 if(im[idx + pixel[7]] > cb)
                  if(im[idx + pixel[8]] > cb)
                   if(im[idx + pixel[9]] > cb)
                    if(im[idx + pixel[10]] > cb)
                     if(im[idx + pixel[11]] > cb)
                      if(im[idx + pixel[12]] > cb)
                       if(im[idx + pixel[14]] > cb)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else if(im[idx + pixel[13]] < c_b)
                 if(im[idx + pixel[14]] < c_b)
                  {}
                 else
                  continue;
                else
                 continue;
               else
                if(im[idx + pixel[7]] > cb)
                 if(im[idx + pixel[8]] > cb)
                  if(im[idx + pixel[9]] > cb)
                   if(im[idx + pixel[10]] > cb)
                    if(im[idx + pixel[11]] > cb)
                     if(im[idx + pixel[12]] > cb)
                      if(im[idx + pixel[13]] > cb)
                       if(im[idx + pixel[14]] > cb)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else if(im[idx + pixel[6]] < c_b)
               if(im[idx + pixel[7]] > cb)
                if(im[idx + pixel[14]] > cb)
                 if(im[idx + pixel[8]] > cb)
                  if(im[idx + pixel[9]] > cb)
                   if(im[idx + pixel[10]] > cb)
                    if(im[idx + pixel[11]] > cb)
                     if(im[idx + pixel[12]] > cb)
                      if(im[idx + pixel[13]] > cb)
                       if(im[idx + pixel[15]] > cb)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  continue;
                else
                 continue;
               else if(im[idx + pixel[7]] < c_b)
                if(im[idx + pixel[8]] < c_b)
                 {}
                else
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  continue;
               else
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[13]] > cb)
                if(im[idx + pixel[7]] > cb)
                 if(im[idx + pixel[8]] > cb)
                  if(im[idx + pixel[9]] > cb)
                   if(im[idx + pixel[10]] > cb)
                    if(im[idx + pixel[11]] > cb)
                     if(im[idx + pixel[12]] > cb)
                      if(im[idx + pixel[14]] > cb)
                       if(im[idx + pixel[15]] > cb)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[12]] > cb)
               if(im[idx + pixel[7]] > cb)
                if(im[idx + pixel[8]] > cb)
                 if(im[idx + pixel[9]] > cb)
                  if(im[idx + pixel[10]] > cb)
                   if(im[idx + pixel[11]] > cb)
                    if(im[idx + pixel[13]] > cb)
                     if(im[idx + pixel[14]] > cb)
                      if(im[idx + pixel[6]] > cb)
                       {}
                      else
                       if(im[idx + pixel[15]] > cb)
                        {}
                       else
                        continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      if(im[idx + pixel[10]] < c_b)
                       if(im[idx + pixel[11]] < c_b)
                        {}
                       else
                        continue;
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             if(im[idx + pixel[11]] > cb)
              if(im[idx + pixel[7]] > cb)
               if(im[idx + pixel[8]] > cb)
                if(im[idx + pixel[9]] > cb)
                 if(im[idx + pixel[10]] > cb)
                  if(im[idx + pixel[12]] > cb)
                   if(im[idx + pixel[13]] > cb)
                    if(im[idx + pixel[6]] > cb)
                     if(im[idx + pixel[5]] > cb)
                      {}
                     else
                      if(im[idx + pixel[14]] > cb)
                       {}
                      else
                       continue;
                    else
                     if(im[idx + pixel[14]] > cb)
                      if(im[idx + pixel[15]] > cb)
                       {}
                      else
                       continue;
                     else
                      continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      if(im[idx + pixel[10]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      if(im[idx + pixel[10]] < c_b)
                       {}
                      else
                       continue;
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                continue;
              else
               continue;
             else
              continue;
           else
            if(im[idx + pixel[10]] > cb)
             if(im[idx + pixel[7]] > cb)
              if(im[idx + pixel[8]] > cb)
               if(im[idx + pixel[9]] > cb)
                if(im[idx + pixel[11]] > cb)
                 if(im[idx + pixel[12]] > cb)
                  if(im[idx + pixel[6]] > cb)
                   if(im[idx + pixel[5]] > cb)
                    if(im[idx + pixel[4]] > cb)
                     {}
                    else
                     if(im[idx + pixel[13]] > cb)
                      {}
                     else
                      continue;
                   else
                    if(im[idx + pixel[13]] > cb)
                     if(im[idx + pixel[14]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                  else
                   if(im[idx + pixel[13]] > cb)
                    if(im[idx + pixel[14]] > cb)
                     if(im[idx + pixel[15]] > cb)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
            else if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     if(im[idx + pixel[9]] < c_b)
                      {}
                     else
                      continue;
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               continue;
             else
              continue;
            else
             continue;
          else
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[7]] > cb)
             if(im[idx + pixel[8]] > cb)
              if(im[idx + pixel[10]] > cb)
               if(im[idx + pixel[11]] > cb)
                if(im[idx + pixel[6]] > cb)
                 if(im[idx + pixel[5]] > cb)
                  if(im[idx + pixel[4]] > cb)
                   if(im[idx + pixel[3]] > cb)
                    {}
                   else
                    if(im[idx + pixel[12]] > cb)
                     {}
                    else
                     continue;
                  else
                   if(im[idx + pixel[12]] > cb)
                    if(im[idx + pixel[13]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                 else
                  if(im[idx + pixel[12]] > cb)
                   if(im[idx + pixel[13]] > cb)
                    if(im[idx + pixel[14]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[12]] > cb)
                  if(im[idx + pixel[13]] > cb)
                   if(im[idx + pixel[14]] > cb)
                    if(im[idx + pixel[15]] > cb)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                continue;
              else
               continue;
             else
              continue;
            else
             continue;
           else if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    if(im[idx + pixel[8]] < c_b)
                     {}
                    else
                     continue;
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              continue;
            else
             continue;
           else
            continue;
         else
          if(im[idx + pixel[8]] > cb)
           if(im[idx + pixel[7]] > cb)
            if(im[idx + pixel[9]] > cb)
             if(im[idx + pixel[10]] > cb)
              if(im[idx + pixel[6]] > cb)
               if(im[idx + pixel[5]] > cb)
                if(im[idx + pixel[4]] > cb)
                 if(im[idx + pixel[3]] > cb)
                  if(im[idx + pixel[2]] > cb)
                   {}
                  else
                   if(im[idx + pixel[11]] > cb)
                    {}
                   else
                    continue;
                 else
                  if(im[idx + pixel[11]] > cb)
                   if(im[idx + pixel[12]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[11]] > cb)
                  if(im[idx + pixel[12]] > cb)
                   if(im[idx + pixel[13]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[11]] > cb)
                 if(im[idx + pixel[12]] > cb)
                  if(im[idx + pixel[13]] > cb)
                   if(im[idx + pixel[14]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[11]] > cb)
                if(im[idx + pixel[12]] > cb)
                 if(im[idx + pixel[13]] > cb)
                  if(im[idx + pixel[14]] > cb)
                   if(im[idx + pixel[15]] > cb)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              continue;
            else
             continue;
           else
            continue;
          else if(im[idx + pixel[8]] < c_b)
           if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[10]] < c_b)
             if(im[idx + pixel[11]] < c_b)
              if(im[idx + pixel[12]] < c_b)
               if(im[idx + pixel[13]] < c_b)
                if(im[idx + pixel[14]] < c_b)
                 if(im[idx + pixel[15]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                else
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[2]] < c_b)
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[4]] < c_b)
                 if(im[idx + pixel[5]] < c_b)
                  if(im[idx + pixel[6]] < c_b)
                   if(im[idx + pixel[7]] < c_b)
                    {}
                   else
                    continue;
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             continue;
           else
            continue;
          else
           continue;
        else
         if(im[idx + pixel[7]] > cb)
          if(im[idx + pixel[8]] > cb)
           if(im[idx + pixel[9]] > cb)
            if(im[idx + pixel[6]] > cb)
             if(im[idx + pixel[5]] > cb)
              if(im[idx + pixel[4]] > cb)
               if(im[idx + pixel[3]] > cb)
                if(im[idx + pixel[2]] > cb)
                 if(im[idx + pixel[1]] > cb)
                  {}
                 else
                  if(im[idx + pixel[10]] > cb)
                   {}
                  else
                   continue;
                else
                 if(im[idx + pixel[10]] > cb)
                  if(im[idx + pixel[11]] > cb)
                   {}
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[10]] > cb)
                 if(im[idx + pixel[11]] > cb)
                  if(im[idx + pixel[12]] > cb)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[10]] > cb)
                if(im[idx + pixel[11]] > cb)
                 if(im[idx + pixel[12]] > cb)
                  if(im[idx + pixel[13]] > cb)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[10]] > cb)
               if(im[idx + pixel[11]] > cb)
                if(im[idx + pixel[12]] > cb)
                 if(im[idx + pixel[13]] > cb)
                  if(im[idx + pixel[14]] > cb)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             if(im[idx + pixel[10]] > cb)
              if(im[idx + pixel[11]] > cb)
               if(im[idx + pixel[12]] > cb)
                if(im[idx + pixel[13]] > cb)
                 if(im[idx + pixel[14]] > cb)
                  if(im[idx + pixel[15]] > cb)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
           else
            continue;
          else
           continue;
         else if(im[idx + pixel[7]] < c_b)
          if(im[idx + pixel[8]] < c_b)
           if(im[idx + pixel[9]] < c_b)
            if(im[idx + pixel[6]] < c_b)
             if(im[idx + pixel[5]] < c_b)
              if(im[idx + pixel[4]] < c_b)
               if(im[idx + pixel[3]] < c_b)
                if(im[idx + pixel[2]] < c_b)
                 if(im[idx + pixel[1]] < c_b)
                  {}
                 else
                  if(im[idx + pixel[10]] < c_b)
                   {}
                  else
                   continue;
                else
                 if(im[idx + pixel[10]] < c_b)
                  if(im[idx + pixel[11]] < c_b)
                   {}
                  else
                   continue;
                 else
                  continue;
               else
                if(im[idx + pixel[10]] < c_b)
                 if(im[idx + pixel[11]] < c_b)
                  if(im[idx + pixel[12]] < c_b)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
              else
               if(im[idx + pixel[10]] < c_b)
                if(im[idx + pixel[11]] < c_b)
                 if(im[idx + pixel[12]] < c_b)
                  if(im[idx + pixel[13]] < c_b)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
             else
              if(im[idx + pixel[10]] < c_b)
               if(im[idx + pixel[11]] < c_b)
                if(im[idx + pixel[12]] < c_b)
                 if(im[idx + pixel[13]] < c_b)
                  if(im[idx + pixel[14]] < c_b)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
            else
             if(im[idx + pixel[10]] < c_b)
              if(im[idx + pixel[11]] < c_b)
               if(im[idx + pixel[12]] < c_b)
                if(im[idx + pixel[13]] < c_b)
                 if(im[idx + pixel[14]] < c_b)
                  if(im[idx + pixel[15]] < c_b)
                   {}
                  else
                   continue;
                 else
                  continue;
                else
                 continue;
               else
                continue;
              else
               continue;
             else
              continue;
           else
            continue;
          else
           continue;
         else
          continue;

			corners.push({
				x:x,
				y:y
			});
		}
	}

	return corners;
}

function fast9_score(im, xsize, ysize, corners, b)
{	
	var scores = [];
	var stride = xsize;

	var pixel = new Array(16);
	pixel[0] = 0 + stride * 3;
	pixel[1] = 1 + stride * 3;
	pixel[2] = 2 + stride * 2;
	pixel[3] = 3 + stride * 1;
	pixel[4] = 3 + stride * 0;
	pixel[5] = 3 + stride * -1;
	pixel[6] = 2 + stride * -2;
	pixel[7] = 1 + stride * -3;
	pixel[8] = 0 + stride * -3;
	pixel[9] = -1 + stride * -3;
	pixel[10] = -2 + stride * -2;
	pixel[11] = -3 + stride * -1;
	pixel[12] = -3 + stride * 0;
	pixel[13] = -3 + stride * 1;
	pixel[14] = -2 + stride * 2;
	pixel[15] = -1 + stride * 3;

    for(var n=0; n < corners.length; n++)
        scores[n] = fast9_corner_score(im, stride, corners[n].y, corners[n].x, pixel, b);
        //corners[n].score = fast9_corner_score(im, stride, corners[n].y, corners[n].x, pixel, b);

	return scores;
	//return corners;
}

function fast9_is_corner(im, stride, y, x, pixel, b)
{
	var idx = y*stride + x;
	var cb = im[idx] + b;
	var c_b= im[idx] - b;


	if( im[idx+pixel[0]] > cb)
	 if( im[idx+pixel[1]] > cb)
	  if( im[idx+pixel[2]] > cb)
	   if( im[idx+pixel[3]] > cb)
		if( im[idx+pixel[4]] > cb)
		 if( im[idx+pixel[5]] > cb)
		  if( im[idx+pixel[6]] > cb)
		   if( im[idx+pixel[7]] > cb)
			if( im[idx+pixel[8]] > cb)
			 return true;
			else
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  return false;
		   else if( im[idx+pixel[7]] < c_b)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  return false;
			else if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[8]] < c_b)
			  if( im[idx+pixel[9]] < c_b)
			   if( im[idx+pixel[10]] < c_b)
				if( im[idx+pixel[11]] < c_b)
				 if( im[idx+pixel[12]] < c_b)
				  if( im[idx+pixel[13]] < c_b)
				   if( im[idx+pixel[15]] < c_b)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  return false;
			else
			 return false;
		  else if( im[idx+pixel[6]] < c_b)
		   if( im[idx+pixel[15]] > cb)
			if( im[idx+pixel[13]] > cb)
			 if( im[idx+pixel[14]] > cb)
			  return true;
			 else
			  return false;
			else if( im[idx+pixel[13]] < c_b)
			 if( im[idx+pixel[7]] < c_b)
			  if( im[idx+pixel[8]] < c_b)
			   if( im[idx+pixel[9]] < c_b)
				if( im[idx+pixel[10]] < c_b)
				 if( im[idx+pixel[11]] < c_b)
				  if( im[idx+pixel[12]] < c_b)
				   if( im[idx+pixel[14]] < c_b)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			if( im[idx+pixel[7]] < c_b)
			 if( im[idx+pixel[8]] < c_b)
			  if( im[idx+pixel[9]] < c_b)
			   if( im[idx+pixel[10]] < c_b)
				if( im[idx+pixel[11]] < c_b)
				 if( im[idx+pixel[12]] < c_b)
				  if( im[idx+pixel[13]] < c_b)
				   if( im[idx+pixel[14]] < c_b)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  return false;
			else
			 return false;
		   else if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[7]] < c_b)
			 if( im[idx+pixel[8]] < c_b)
			  if( im[idx+pixel[9]] < c_b)
			   if( im[idx+pixel[10]] < c_b)
				if( im[idx+pixel[11]] < c_b)
				 if( im[idx+pixel[12]] < c_b)
				  if( im[idx+pixel[14]] < c_b)
				   if( im[idx+pixel[15]] < c_b)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else if( im[idx+pixel[5]] < c_b)
		  if( im[idx+pixel[14]] > cb)
		   if( im[idx+pixel[12]] > cb)
			if( im[idx+pixel[13]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  if( im[idx+pixel[10]] > cb)
				   if( im[idx+pixel[11]] > cb)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 return false;
		   else if( im[idx+pixel[12]] < c_b)
			if( im[idx+pixel[6]] < c_b)
			 if( im[idx+pixel[7]] < c_b)
			  if( im[idx+pixel[8]] < c_b)
			   if( im[idx+pixel[9]] < c_b)
				if( im[idx+pixel[10]] < c_b)
				 if( im[idx+pixel[11]] < c_b)
				  if( im[idx+pixel[13]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else if( im[idx+pixel[14]] < c_b)
		   if( im[idx+pixel[7]] < c_b)
			if( im[idx+pixel[8]] < c_b)
			 if( im[idx+pixel[9]] < c_b)
			  if( im[idx+pixel[10]] < c_b)
			   if( im[idx+pixel[11]] < c_b)
				if( im[idx+pixel[12]] < c_b)
				 if( im[idx+pixel[13]] < c_b)
				  if( im[idx+pixel[6]] < c_b)
				   return true;
				  else
				   if( im[idx+pixel[15]] < c_b)
					return true;
				   else
					return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   if( im[idx+pixel[6]] < c_b)
			if( im[idx+pixel[7]] < c_b)
			 if( im[idx+pixel[8]] < c_b)
			  if( im[idx+pixel[9]] < c_b)
			   if( im[idx+pixel[10]] < c_b)
				if( im[idx+pixel[11]] < c_b)
				 if( im[idx+pixel[12]] < c_b)
				  if( im[idx+pixel[13]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  if( im[idx+pixel[10]] > cb)
				   if( im[idx+pixel[11]] > cb)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 return false;
		   else
			return false;
		  else if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[7]] < c_b)
			if( im[idx+pixel[8]] < c_b)
			 if( im[idx+pixel[9]] < c_b)
			  if( im[idx+pixel[10]] < c_b)
			   if( im[idx+pixel[11]] < c_b)
				if( im[idx+pixel[13]] < c_b)
				 if( im[idx+pixel[14]] < c_b)
				  if( im[idx+pixel[6]] < c_b)
				   return true;
				  else
				   if( im[idx+pixel[15]] < c_b)
					return true;
				   else
					return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else if( im[idx+pixel[4]] < c_b)
		 if( im[idx+pixel[13]] > cb)
		  if( im[idx+pixel[11]] > cb)
		   if( im[idx+pixel[12]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  if( im[idx+pixel[10]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  if( im[idx+pixel[10]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			return false;
		  else if( im[idx+pixel[11]] < c_b)
		   if( im[idx+pixel[5]] < c_b)
			if( im[idx+pixel[6]] < c_b)
			 if( im[idx+pixel[7]] < c_b)
			  if( im[idx+pixel[8]] < c_b)
			   if( im[idx+pixel[9]] < c_b)
				if( im[idx+pixel[10]] < c_b)
				 if( im[idx+pixel[12]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else if( im[idx+pixel[13]] < c_b)
		  if( im[idx+pixel[7]] < c_b)
		   if( im[idx+pixel[8]] < c_b)
			if( im[idx+pixel[9]] < c_b)
			 if( im[idx+pixel[10]] < c_b)
			  if( im[idx+pixel[11]] < c_b)
			   if( im[idx+pixel[12]] < c_b)
				if( im[idx+pixel[6]] < c_b)
				 if( im[idx+pixel[5]] < c_b)
				  return true;
				 else
				  if( im[idx+pixel[14]] < c_b)
				   return true;
				  else
				   return false;
				else
				 if( im[idx+pixel[14]] < c_b)
				  if( im[idx+pixel[15]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  if( im[idx+pixel[5]] < c_b)
		   if( im[idx+pixel[6]] < c_b)
			if( im[idx+pixel[7]] < c_b)
			 if( im[idx+pixel[8]] < c_b)
			  if( im[idx+pixel[9]] < c_b)
			   if( im[idx+pixel[10]] < c_b)
				if( im[idx+pixel[11]] < c_b)
				 if( im[idx+pixel[12]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  if( im[idx+pixel[10]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  if( im[idx+pixel[10]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			return false;
		  else
		   return false;
		 else if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[7]] < c_b)
		   if( im[idx+pixel[8]] < c_b)
			if( im[idx+pixel[9]] < c_b)
			 if( im[idx+pixel[10]] < c_b)
			  if( im[idx+pixel[12]] < c_b)
			   if( im[idx+pixel[13]] < c_b)
				if( im[idx+pixel[6]] < c_b)
				 if( im[idx+pixel[5]] < c_b)
				  return true;
				 else
				  if( im[idx+pixel[14]] < c_b)
				   return true;
				  else
				   return false;
				else
				 if( im[idx+pixel[14]] < c_b)
				  if( im[idx+pixel[15]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
	   else if( im[idx+pixel[3]] < c_b)
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   return false;
		 else
		  return false;
		else if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[7]] < c_b)
		  if( im[idx+pixel[8]] < c_b)
		   if( im[idx+pixel[9]] < c_b)
			if( im[idx+pixel[11]] < c_b)
			 if( im[idx+pixel[6]] < c_b)
			  if( im[idx+pixel[5]] < c_b)
			   if( im[idx+pixel[4]] < c_b)
				return true;
			   else
				if( im[idx+pixel[12]] < c_b)
				 if( im[idx+pixel[13]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			  else
			   if( im[idx+pixel[12]] < c_b)
				if( im[idx+pixel[13]] < c_b)
				 if( im[idx+pixel[14]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			 else
			  if( im[idx+pixel[12]] < c_b)
			   if( im[idx+pixel[13]] < c_b)
				if( im[idx+pixel[14]] < c_b)
				 if( im[idx+pixel[15]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	   else
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 if( im[idx+pixel[9]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   return false;
		 else
		  return false;
		else if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[7]] < c_b)
		  if( im[idx+pixel[8]] < c_b)
		   if( im[idx+pixel[9]] < c_b)
			if( im[idx+pixel[11]] < c_b)
			 if( im[idx+pixel[12]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[5]] < c_b)
				if( im[idx+pixel[4]] < c_b)
				 return true;
				else
				 if( im[idx+pixel[13]] < c_b)
				  return true;
				 else
				  return false;
			   else
				if( im[idx+pixel[13]] < c_b)
				 if( im[idx+pixel[14]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			  else
			   if( im[idx+pixel[13]] < c_b)
				if( im[idx+pixel[14]] < c_b)
				 if( im[idx+pixel[15]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	  else if( im[idx+pixel[2]] < c_b)
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  return false;
		else
		 return false;
	   else if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[7]] < c_b)
		 if( im[idx+pixel[8]] < c_b)
		  if( im[idx+pixel[10]] < c_b)
		   if( im[idx+pixel[6]] < c_b)
			if( im[idx+pixel[5]] < c_b)
			 if( im[idx+pixel[4]] < c_b)
			  if( im[idx+pixel[3]] < c_b)
			   return true;
			  else
			   if( im[idx+pixel[11]] < c_b)
				if( im[idx+pixel[12]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			 else
			  if( im[idx+pixel[11]] < c_b)
			   if( im[idx+pixel[12]] < c_b)
				if( im[idx+pixel[13]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[11]] < c_b)
			  if( im[idx+pixel[12]] < c_b)
			   if( im[idx+pixel[13]] < c_b)
				if( im[idx+pixel[14]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[11]] < c_b)
			 if( im[idx+pixel[12]] < c_b)
			  if( im[idx+pixel[13]] < c_b)
			   if( im[idx+pixel[14]] < c_b)
				if( im[idx+pixel[15]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	   else
		return false;
	  else
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				if( im[idx+pixel[8]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  return false;
		else
		 return false;
	   else if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[7]] < c_b)
		 if( im[idx+pixel[8]] < c_b)
		  if( im[idx+pixel[10]] < c_b)
		   if( im[idx+pixel[11]] < c_b)
			if( im[idx+pixel[6]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[4]] < c_b)
			   if( im[idx+pixel[3]] < c_b)
				return true;
			   else
				if( im[idx+pixel[12]] < c_b)
				 return true;
				else
				 return false;
			  else
			   if( im[idx+pixel[12]] < c_b)
				if( im[idx+pixel[13]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			 else
			  if( im[idx+pixel[12]] < c_b)
			   if( im[idx+pixel[13]] < c_b)
				if( im[idx+pixel[14]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[12]] < c_b)
			  if( im[idx+pixel[13]] < c_b)
			   if( im[idx+pixel[14]] < c_b)
				if( im[idx+pixel[15]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	   else
		return false;
	 else if( im[idx+pixel[1]] < c_b)
	  if( im[idx+pixel[8]] > cb)
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[2]] > cb)
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 return false;
	   else
		return false;
	  else if( im[idx+pixel[8]] < c_b)
	   if( im[idx+pixel[7]] < c_b)
		if( im[idx+pixel[9]] < c_b)
		 if( im[idx+pixel[6]] < c_b)
		  if( im[idx+pixel[5]] < c_b)
		   if( im[idx+pixel[4]] < c_b)
			if( im[idx+pixel[3]] < c_b)
			 if( im[idx+pixel[2]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[10]] < c_b)
			   if( im[idx+pixel[11]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[10]] < c_b)
			  if( im[idx+pixel[11]] < c_b)
			   if( im[idx+pixel[12]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[10]] < c_b)
			 if( im[idx+pixel[11]] < c_b)
			  if( im[idx+pixel[12]] < c_b)
			   if( im[idx+pixel[13]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[10]] < c_b)
			if( im[idx+pixel[11]] < c_b)
			 if( im[idx+pixel[12]] < c_b)
			  if( im[idx+pixel[13]] < c_b)
			   if( im[idx+pixel[14]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[10]] < c_b)
		   if( im[idx+pixel[11]] < c_b)
			if( im[idx+pixel[12]] < c_b)
			 if( im[idx+pixel[13]] < c_b)
			  if( im[idx+pixel[14]] < c_b)
			   if( im[idx+pixel[15]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 return false;
	   else
		return false;
	  else
	   return false;
	 else
	  if( im[idx+pixel[8]] > cb)
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[15]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[2]] > cb)
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[7]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 return false;
	   else
		return false;
	  else if( im[idx+pixel[8]] < c_b)
	   if( im[idx+pixel[7]] < c_b)
		if( im[idx+pixel[9]] < c_b)
		 if( im[idx+pixel[10]] < c_b)
		  if( im[idx+pixel[6]] < c_b)
		   if( im[idx+pixel[5]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[3]] < c_b)
			  if( im[idx+pixel[2]] < c_b)
			   return true;
			  else
			   if( im[idx+pixel[11]] < c_b)
				return true;
			   else
				return false;
			 else
			  if( im[idx+pixel[11]] < c_b)
			   if( im[idx+pixel[12]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[11]] < c_b)
			  if( im[idx+pixel[12]] < c_b)
			   if( im[idx+pixel[13]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[11]] < c_b)
			 if( im[idx+pixel[12]] < c_b)
			  if( im[idx+pixel[13]] < c_b)
			   if( im[idx+pixel[14]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[11]] < c_b)
			if( im[idx+pixel[12]] < c_b)
			 if( im[idx+pixel[13]] < c_b)
			  if( im[idx+pixel[14]] < c_b)
			   if( im[idx+pixel[15]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  return false;
		else
		 return false;
	   else
		return false;
	  else
	   return false;
	else if( im[idx+pixel[0]] < c_b)
	 if( im[idx+pixel[1]] > cb)
	  if( im[idx+pixel[8]] > cb)
	   if( im[idx+pixel[7]] > cb)
		if( im[idx+pixel[9]] > cb)
		 if( im[idx+pixel[6]] > cb)
		  if( im[idx+pixel[5]] > cb)
		   if( im[idx+pixel[4]] > cb)
			if( im[idx+pixel[3]] > cb)
			 if( im[idx+pixel[2]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[10]] > cb)
			   if( im[idx+pixel[11]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[10]] > cb)
			  if( im[idx+pixel[11]] > cb)
			   if( im[idx+pixel[12]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[10]] > cb)
			 if( im[idx+pixel[11]] > cb)
			  if( im[idx+pixel[12]] > cb)
			   if( im[idx+pixel[13]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[10]] > cb)
			if( im[idx+pixel[11]] > cb)
			 if( im[idx+pixel[12]] > cb)
			  if( im[idx+pixel[13]] > cb)
			   if( im[idx+pixel[14]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[10]] > cb)
		   if( im[idx+pixel[11]] > cb)
			if( im[idx+pixel[12]] > cb)
			 if( im[idx+pixel[13]] > cb)
			  if( im[idx+pixel[14]] > cb)
			   if( im[idx+pixel[15]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 return false;
	   else
		return false;
	  else if( im[idx+pixel[8]] < c_b)
	   if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[2]] < c_b)
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 return false;
	   else
		return false;
	  else
	   return false;
	 else if( im[idx+pixel[1]] < c_b)
	  if( im[idx+pixel[2]] > cb)
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[7]] > cb)
		 if( im[idx+pixel[8]] > cb)
		  if( im[idx+pixel[10]] > cb)
		   if( im[idx+pixel[6]] > cb)
			if( im[idx+pixel[5]] > cb)
			 if( im[idx+pixel[4]] > cb)
			  if( im[idx+pixel[3]] > cb)
			   return true;
			  else
			   if( im[idx+pixel[11]] > cb)
				if( im[idx+pixel[12]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			 else
			  if( im[idx+pixel[11]] > cb)
			   if( im[idx+pixel[12]] > cb)
				if( im[idx+pixel[13]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[11]] > cb)
			  if( im[idx+pixel[12]] > cb)
			   if( im[idx+pixel[13]] > cb)
				if( im[idx+pixel[14]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[11]] > cb)
			 if( im[idx+pixel[12]] > cb)
			  if( im[idx+pixel[13]] > cb)
			   if( im[idx+pixel[14]] > cb)
				if( im[idx+pixel[15]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	   else if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  return false;
		else
		 return false;
	   else
		return false;
	  else if( im[idx+pixel[2]] < c_b)
	   if( im[idx+pixel[3]] > cb)
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[7]] > cb)
		  if( im[idx+pixel[8]] > cb)
		   if( im[idx+pixel[9]] > cb)
			if( im[idx+pixel[11]] > cb)
			 if( im[idx+pixel[6]] > cb)
			  if( im[idx+pixel[5]] > cb)
			   if( im[idx+pixel[4]] > cb)
				return true;
			   else
				if( im[idx+pixel[12]] > cb)
				 if( im[idx+pixel[13]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			  else
			   if( im[idx+pixel[12]] > cb)
				if( im[idx+pixel[13]] > cb)
				 if( im[idx+pixel[14]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			 else
			  if( im[idx+pixel[12]] > cb)
			   if( im[idx+pixel[13]] > cb)
				if( im[idx+pixel[14]] > cb)
				 if( im[idx+pixel[15]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
		else if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	   else if( im[idx+pixel[3]] < c_b)
		if( im[idx+pixel[4]] > cb)
		 if( im[idx+pixel[13]] > cb)
		  if( im[idx+pixel[7]] > cb)
		   if( im[idx+pixel[8]] > cb)
			if( im[idx+pixel[9]] > cb)
			 if( im[idx+pixel[10]] > cb)
			  if( im[idx+pixel[11]] > cb)
			   if( im[idx+pixel[12]] > cb)
				if( im[idx+pixel[6]] > cb)
				 if( im[idx+pixel[5]] > cb)
				  return true;
				 else
				  if( im[idx+pixel[14]] > cb)
				   return true;
				  else
				   return false;
				else
				 if( im[idx+pixel[14]] > cb)
				  if( im[idx+pixel[15]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else if( im[idx+pixel[13]] < c_b)
		  if( im[idx+pixel[11]] > cb)
		   if( im[idx+pixel[5]] > cb)
			if( im[idx+pixel[6]] > cb)
			 if( im[idx+pixel[7]] > cb)
			  if( im[idx+pixel[8]] > cb)
			   if( im[idx+pixel[9]] > cb)
				if( im[idx+pixel[10]] > cb)
				 if( im[idx+pixel[12]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else if( im[idx+pixel[11]] < c_b)
		   if( im[idx+pixel[12]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  if( im[idx+pixel[10]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  if( im[idx+pixel[10]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			return false;
		  else
		   return false;
		 else
		  if( im[idx+pixel[5]] > cb)
		   if( im[idx+pixel[6]] > cb)
			if( im[idx+pixel[7]] > cb)
			 if( im[idx+pixel[8]] > cb)
			  if( im[idx+pixel[9]] > cb)
			   if( im[idx+pixel[10]] > cb)
				if( im[idx+pixel[11]] > cb)
				 if( im[idx+pixel[12]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else if( im[idx+pixel[4]] < c_b)
		 if( im[idx+pixel[5]] > cb)
		  if( im[idx+pixel[14]] > cb)
		   if( im[idx+pixel[7]] > cb)
			if( im[idx+pixel[8]] > cb)
			 if( im[idx+pixel[9]] > cb)
			  if( im[idx+pixel[10]] > cb)
			   if( im[idx+pixel[11]] > cb)
				if( im[idx+pixel[12]] > cb)
				 if( im[idx+pixel[13]] > cb)
				  if( im[idx+pixel[6]] > cb)
				   return true;
				  else
				   if( im[idx+pixel[15]] > cb)
					return true;
				   else
					return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else if( im[idx+pixel[14]] < c_b)
		   if( im[idx+pixel[12]] > cb)
			if( im[idx+pixel[6]] > cb)
			 if( im[idx+pixel[7]] > cb)
			  if( im[idx+pixel[8]] > cb)
			   if( im[idx+pixel[9]] > cb)
				if( im[idx+pixel[10]] > cb)
				 if( im[idx+pixel[11]] > cb)
				  if( im[idx+pixel[13]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else if( im[idx+pixel[12]] < c_b)
			if( im[idx+pixel[13]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  if( im[idx+pixel[10]] < c_b)
				   if( im[idx+pixel[11]] < c_b)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 return false;
		   else
			return false;
		  else
		   if( im[idx+pixel[6]] > cb)
			if( im[idx+pixel[7]] > cb)
			 if( im[idx+pixel[8]] > cb)
			  if( im[idx+pixel[9]] > cb)
			   if( im[idx+pixel[10]] > cb)
				if( im[idx+pixel[11]] > cb)
				 if( im[idx+pixel[12]] > cb)
				  if( im[idx+pixel[13]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else if( im[idx+pixel[5]] < c_b)
		  if( im[idx+pixel[6]] > cb)
		   if( im[idx+pixel[15]] < c_b)
			if( im[idx+pixel[13]] > cb)
			 if( im[idx+pixel[7]] > cb)
			  if( im[idx+pixel[8]] > cb)
			   if( im[idx+pixel[9]] > cb)
				if( im[idx+pixel[10]] > cb)
				 if( im[idx+pixel[11]] > cb)
				  if( im[idx+pixel[12]] > cb)
				   if( im[idx+pixel[14]] > cb)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else if( im[idx+pixel[13]] < c_b)
			 if( im[idx+pixel[14]] < c_b)
			  return true;
			 else
			  return false;
			else
			 return false;
		   else
			if( im[idx+pixel[7]] > cb)
			 if( im[idx+pixel[8]] > cb)
			  if( im[idx+pixel[9]] > cb)
			   if( im[idx+pixel[10]] > cb)
				if( im[idx+pixel[11]] > cb)
				 if( im[idx+pixel[12]] > cb)
				  if( im[idx+pixel[13]] > cb)
				   if( im[idx+pixel[14]] > cb)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else if( im[idx+pixel[6]] < c_b)
		   if( im[idx+pixel[7]] > cb)
			if( im[idx+pixel[14]] > cb)
			 if( im[idx+pixel[8]] > cb)
			  if( im[idx+pixel[9]] > cb)
			   if( im[idx+pixel[10]] > cb)
				if( im[idx+pixel[11]] > cb)
				 if( im[idx+pixel[12]] > cb)
				  if( im[idx+pixel[13]] > cb)
				   if( im[idx+pixel[15]] > cb)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  return false;
			else
			 return false;
		   else if( im[idx+pixel[7]] < c_b)
			if( im[idx+pixel[8]] < c_b)
			 return true;
			else
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  return false;
		   else
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[13]] > cb)
			if( im[idx+pixel[7]] > cb)
			 if( im[idx+pixel[8]] > cb)
			  if( im[idx+pixel[9]] > cb)
			   if( im[idx+pixel[10]] > cb)
				if( im[idx+pixel[11]] > cb)
				 if( im[idx+pixel[12]] > cb)
				  if( im[idx+pixel[14]] > cb)
				   if( im[idx+pixel[15]] > cb)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[12]] > cb)
		   if( im[idx+pixel[7]] > cb)
			if( im[idx+pixel[8]] > cb)
			 if( im[idx+pixel[9]] > cb)
			  if( im[idx+pixel[10]] > cb)
			   if( im[idx+pixel[11]] > cb)
				if( im[idx+pixel[13]] > cb)
				 if( im[idx+pixel[14]] > cb)
				  if( im[idx+pixel[6]] > cb)
				   return true;
				  else
				   if( im[idx+pixel[15]] > cb)
					return true;
				   else
					return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  if( im[idx+pixel[10]] < c_b)
				   if( im[idx+pixel[11]] < c_b)
					return true;
				   else
					return false;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 if( im[idx+pixel[11]] > cb)
		  if( im[idx+pixel[7]] > cb)
		   if( im[idx+pixel[8]] > cb)
			if( im[idx+pixel[9]] > cb)
			 if( im[idx+pixel[10]] > cb)
			  if( im[idx+pixel[12]] > cb)
			   if( im[idx+pixel[13]] > cb)
				if( im[idx+pixel[6]] > cb)
				 if( im[idx+pixel[5]] > cb)
				  return true;
				 else
				  if( im[idx+pixel[14]] > cb)
				   return true;
				  else
				   return false;
				else
				 if( im[idx+pixel[14]] > cb)
				  if( im[idx+pixel[15]] > cb)
				   return true;
				  else
				   return false;
				 else
				  return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  if( im[idx+pixel[10]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  if( im[idx+pixel[10]] < c_b)
				   return true;
				  else
				   return false;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
	   else
		if( im[idx+pixel[10]] > cb)
		 if( im[idx+pixel[7]] > cb)
		  if( im[idx+pixel[8]] > cb)
		   if( im[idx+pixel[9]] > cb)
			if( im[idx+pixel[11]] > cb)
			 if( im[idx+pixel[12]] > cb)
			  if( im[idx+pixel[6]] > cb)
			   if( im[idx+pixel[5]] > cb)
				if( im[idx+pixel[4]] > cb)
				 return true;
				else
				 if( im[idx+pixel[13]] > cb)
				  return true;
				 else
				  return false;
			   else
				if( im[idx+pixel[13]] > cb)
				 if( im[idx+pixel[14]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			  else
			   if( im[idx+pixel[13]] > cb)
				if( im[idx+pixel[14]] > cb)
				 if( im[idx+pixel[15]] > cb)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
		else if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 if( im[idx+pixel[9]] < c_b)
				  return true;
				 else
				  return false;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	  else
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[7]] > cb)
		 if( im[idx+pixel[8]] > cb)
		  if( im[idx+pixel[10]] > cb)
		   if( im[idx+pixel[11]] > cb)
			if( im[idx+pixel[6]] > cb)
			 if( im[idx+pixel[5]] > cb)
			  if( im[idx+pixel[4]] > cb)
			   if( im[idx+pixel[3]] > cb)
				return true;
			   else
				if( im[idx+pixel[12]] > cb)
				 return true;
				else
				 return false;
			  else
			   if( im[idx+pixel[12]] > cb)
				if( im[idx+pixel[13]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			 else
			  if( im[idx+pixel[12]] > cb)
			   if( im[idx+pixel[13]] > cb)
				if( im[idx+pixel[14]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[12]] > cb)
			  if( im[idx+pixel[13]] > cb)
			   if( im[idx+pixel[14]] > cb)
				if( im[idx+pixel[15]] > cb)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
		else
		 return false;
	   else if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				if( im[idx+pixel[8]] < c_b)
				 return true;
				else
				 return false;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  return false;
		else
		 return false;
	   else
		return false;
	 else
	  if( im[idx+pixel[8]] > cb)
	   if( im[idx+pixel[7]] > cb)
		if( im[idx+pixel[9]] > cb)
		 if( im[idx+pixel[10]] > cb)
		  if( im[idx+pixel[6]] > cb)
		   if( im[idx+pixel[5]] > cb)
			if( im[idx+pixel[4]] > cb)
			 if( im[idx+pixel[3]] > cb)
			  if( im[idx+pixel[2]] > cb)
			   return true;
			  else
			   if( im[idx+pixel[11]] > cb)
				return true;
			   else
				return false;
			 else
			  if( im[idx+pixel[11]] > cb)
			   if( im[idx+pixel[12]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[11]] > cb)
			  if( im[idx+pixel[12]] > cb)
			   if( im[idx+pixel[13]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[11]] > cb)
			 if( im[idx+pixel[12]] > cb)
			  if( im[idx+pixel[13]] > cb)
			   if( im[idx+pixel[14]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[11]] > cb)
			if( im[idx+pixel[12]] > cb)
			 if( im[idx+pixel[13]] > cb)
			  if( im[idx+pixel[14]] > cb)
			   if( im[idx+pixel[15]] > cb)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  return false;
		else
		 return false;
	   else
		return false;
	  else if( im[idx+pixel[8]] < c_b)
	   if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[10]] < c_b)
		 if( im[idx+pixel[11]] < c_b)
		  if( im[idx+pixel[12]] < c_b)
		   if( im[idx+pixel[13]] < c_b)
			if( im[idx+pixel[14]] < c_b)
			 if( im[idx+pixel[15]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			else
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[2]] < c_b)
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[4]] < c_b)
			 if( im[idx+pixel[5]] < c_b)
			  if( im[idx+pixel[6]] < c_b)
			   if( im[idx+pixel[7]] < c_b)
				return true;
			   else
				return false;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 return false;
	   else
		return false;
	  else
	   return false;
	else
	 if( im[idx+pixel[7]] > cb)
	  if( im[idx+pixel[8]] > cb)
	   if( im[idx+pixel[9]] > cb)
		if( im[idx+pixel[6]] > cb)
		 if( im[idx+pixel[5]] > cb)
		  if( im[idx+pixel[4]] > cb)
		   if( im[idx+pixel[3]] > cb)
			if( im[idx+pixel[2]] > cb)
			 if( im[idx+pixel[1]] > cb)
			  return true;
			 else
			  if( im[idx+pixel[10]] > cb)
			   return true;
			  else
			   return false;
			else
			 if( im[idx+pixel[10]] > cb)
			  if( im[idx+pixel[11]] > cb)
			   return true;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[10]] > cb)
			 if( im[idx+pixel[11]] > cb)
			  if( im[idx+pixel[12]] > cb)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[10]] > cb)
			if( im[idx+pixel[11]] > cb)
			 if( im[idx+pixel[12]] > cb)
			  if( im[idx+pixel[13]] > cb)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[10]] > cb)
		   if( im[idx+pixel[11]] > cb)
			if( im[idx+pixel[12]] > cb)
			 if( im[idx+pixel[13]] > cb)
			  if( im[idx+pixel[14]] > cb)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 if( im[idx+pixel[10]] > cb)
		  if( im[idx+pixel[11]] > cb)
		   if( im[idx+pixel[12]] > cb)
			if( im[idx+pixel[13]] > cb)
			 if( im[idx+pixel[14]] > cb)
			  if( im[idx+pixel[15]] > cb)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
	   else
		return false;
	  else
	   return false;
	 else if( im[idx+pixel[7]] < c_b)
	  if( im[idx+pixel[8]] < c_b)
	   if( im[idx+pixel[9]] < c_b)
		if( im[idx+pixel[6]] < c_b)
		 if( im[idx+pixel[5]] < c_b)
		  if( im[idx+pixel[4]] < c_b)
		   if( im[idx+pixel[3]] < c_b)
			if( im[idx+pixel[2]] < c_b)
			 if( im[idx+pixel[1]] < c_b)
			  return true;
			 else
			  if( im[idx+pixel[10]] < c_b)
			   return true;
			  else
			   return false;
			else
			 if( im[idx+pixel[10]] < c_b)
			  if( im[idx+pixel[11]] < c_b)
			   return true;
			  else
			   return false;
			 else
			  return false;
		   else
			if( im[idx+pixel[10]] < c_b)
			 if( im[idx+pixel[11]] < c_b)
			  if( im[idx+pixel[12]] < c_b)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		  else
		   if( im[idx+pixel[10]] < c_b)
			if( im[idx+pixel[11]] < c_b)
			 if( im[idx+pixel[12]] < c_b)
			  if( im[idx+pixel[13]] < c_b)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		 else
		  if( im[idx+pixel[10]] < c_b)
		   if( im[idx+pixel[11]] < c_b)
			if( im[idx+pixel[12]] < c_b)
			 if( im[idx+pixel[13]] < c_b)
			  if( im[idx+pixel[14]] < c_b)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		else
		 if( im[idx+pixel[10]] < c_b)
		  if( im[idx+pixel[11]] < c_b)
		   if( im[idx+pixel[12]] < c_b)
			if( im[idx+pixel[13]] < c_b)
			 if( im[idx+pixel[14]] < c_b)
			  if( im[idx+pixel[15]] < c_b)
			   return true;
			  else
			   return false;
			 else
			  return false;
			else
			 return false;
		   else
			return false;
		  else
		   return false;
		 else
		  return false;
	   else
		return false;
	  else
	   return false;
	 else
	  return false;
}

function fast9_corner_score(im, stride, y, x, pixel, bstart)
{    
    var bmin = bstart;
    var bmax = 255;
    var b = parseInt((bmax + bmin)/2);
    
    /*Compute the score using binary search*/
	for(;;)
    {
		if (fast9_is_corner(im, stride, y, x, pixel, b)) {
			bmin=b;
		} else {
			bmax=b;
		}

		if(bmin == bmax - 1 || bmin == bmax)
			return bmin;

		b = parseInt((bmin + bmax) / 2);
    }
}

/* nonmax.c */

function nonmax_suppression(corners, scores)
{
	var num_nonmax=0;
	var last_row;
	var row_start;
	var i, j;
	var ret_nonmax = [];

	/*Point above points (roughly) to the pixel above the one of interest, if there
    is a feature there.*/
	var point_above = 0;
	var point_below = 0;

	
	if(corners.length < 1)
	{
		return [];
	}

	ret_nonmax = [];

	/* Find where each row begins
	   (the corners are output in raster scan order). A beginning of -1 signifies
	   that there are no corners on that row. */
	last_row = corners[corners.length-1].y;
	row_start = new Array(last_row+1);

	for(i=0; i < last_row+1; i++)
		row_start[i] = -1;
	
	{
		var prev_row = -1;
		for(i=0; i< corners.length; i++)
			if(corners[i].y != prev_row)
			{
				row_start[corners[i].y] = i;
				prev_row = corners[i].y;
			}
	}
	
	for(i=0; i < corners.length; i++)
	{
		var score = scores[i];
		var pos = corners[i];

		var skip = false;
			
		/*Check left */
		if(i > 0)
			if(corners[i-1].x == pos.x-1 && corners[i-1].y == pos.y && scores[i-1] >= score)
				continue;
			
		/*Check right*/
		if(i < (corners.length - 1))
			if(corners[i+1].x == pos.x+1 && corners[i+1].y == pos.y && scores[i+1] >= score)
				continue;
			
		/*Check above (if there is a valid row above)*/
		if(pos.y != 0 && row_start[pos.y - 1] != -1) 
		{
			/*Make sure that current point_above is one
			  row above.*/
			if(corners[point_above].y < pos.y - 1)
				point_above = row_start[pos.y-1];
			
			/*Make point_above point to the first of the pixels above the current point,
			  if it exists.*/
			for(; corners[point_above].y < pos.y && corners[point_above].x < pos.x - 1; point_above++)
			{}
			
			
			for(j=point_above; corners[j].y < pos.y && corners[j].x <= pos.x + 1; j++)
			{
				var x = corners[j].x;
				if( (x == pos.x - 1 || x ==pos.x || x == pos.x+1) && scores[j] >= score) {
					skip = true;
					break;
				}
			}
			
		}
		
		if (!skip) {
			/*Check below (if there is anything below)*/
			if(pos.y != last_row && row_start[pos.y + 1] != -1 && point_below < corners.length) /*Nothing below*/
			{
				if(corners[point_below].y < pos.y + 1)
					point_below = row_start[pos.y+1];
				
				/* Make point below point to one of the pixels belowthe current point, if it
				   exists.*/
				for(; point_below < corners.length && corners[point_below].y == pos.y+1 && corners[point_below].x < pos.x - 1; point_below++)
				{}

				for(j=point_below; j < corners.length && corners[j].y == pos.y+1 && corners[j].x <= pos.x + 1; j++)
				{
					var x = corners[j].x;
					if( (x == pos.x - 1 || x ==pos.x || x == pos.x+1) && scores[j] >= score) {
						skip = true;
						break;
					}
				}
			}
		}
				
		if (!skip) {
			ret_nonmax.push({
				x:corners[i].x,
				y:corners[i].y,
				score:scores[i]
			});
		}
	}

	return ret_nonmax;
}
