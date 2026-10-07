#!/usr/bin/env bash
# Usage: bash tools/make_frames.sh turntable.mp4 [frame_count]
# Needs ffmpeg. Input: one full 360-degree loop that ends where it starts.
# Output: public/frames/f_0001.webp ... and public/frames/manifest.json
set -e
IN="$1"; COUNT="${2:-120}"
[ -z "$IN" ] && { echo "Usage: bash tools/make_frames.sh video.mp4 [frame_count]"; exit 1; }
cd "$(dirname "$0")/.."
mkdir -p public/frames
rm -f public/frames/f_*.webp
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
FPS=$(python3 -c "print($COUNT/$DUR)" 2>/dev/null || python -c "print($COUNT/$DUR)")
ffmpeg -y -i "$IN" -vf "fps=$FPS,scale=900:-2" -frames:v "$COUNT" -c:v libwebp -quality 78 public/frames/f_%04d.webp
N=$(ls public/frames/f_*.webp | wc -l | tr -d ' ')
echo "{\"count\": $N, \"ext\": \"webp\"}" > public/frames/manifest.json
echo "Done: $N frames"
