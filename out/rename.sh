#!/bin/sh
for thisPath in `ls -d */*/*`
do
thisFile=${thisPath#*/*/}
oldY=${thisFile%.png}
zoomX=${thisPath%/*}
zoom=${thisPath%/*/*}
newY=$(((1&lt;&lt;zoom) - oldY - 1))
mv ${zoomX}/${oldY}.png ${zoomX}/${newY}.png
done