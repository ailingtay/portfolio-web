#!/usr/bin/env python3
"""Rebuild only C's selected media derivatives; never overwrite source artwork.

Usage: python3 scripts/optimize-c-media.py --ffmpeg /path/to/ffmpeg
Requires Pillow for responsive stills. Encoding settings and source relationships
are recorded in assets/design-c/optimized/{manifest,images}.json.
"""
import argparse
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/design-c/optimized'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg', default=shutil.which('ffmpeg'))
    parser.add_argument('--only', choices=['videos', 'images', 'all'], default='all')
    args = parser.parse_args()
    if args.only in ('videos', 'all'):
        if not args.ffmpeg:
            parser.error('Pass --ffmpeg with the path to an installed FFmpeg executable.')
        rows = json.loads((OUT / 'manifest.json').read_text())
        written = set()
        for row in rows:
            for kind in ('desktop', 'mobile'):
                variant = row[kind]
                if variant.get('unchanged') or variant['src'] == row['original'] or variant['src'] in written:
                    continue
                source, destination = ROOT / row['original'], ROOT / variant['src']
                assert destination.parent == OUT and source != destination
                fps = variant['fps']
                subprocess.run([
                    args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
                    '-vf', f"scale={variant['width']}:-2:flags=lanczos,fps={fps}",
                    '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', str(variant['crf']),
                    '-g', str(round(fps * 2)), '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                    str(destination)
                ], check=True)
                written.add(variant['src'])
                print(destination.relative_to(ROOT))
        # A fallback can be shared by desktop/mobile entries. Refresh both sizes.
        for row in rows:
            for kind in ('desktop', 'mobile'):
                row[kind]['bytes'] = (ROOT / row[kind]['src']).stat().st_size
        (OUT / 'manifest.json').write_text(json.dumps(rows, indent=2) + '\n')
    if args.only in ('images', 'all'):
        from PIL import Image
        rows = json.loads((OUT / 'images.json').read_text())
        written = set()
        for row in rows:
            source = ROOT / row['original']
            for variant in row['variants']:
                if variant['src'] == row['original'] or variant['src'] in written:
                    continue
                destination = ROOT / variant['src']
                assert destination.parent == OUT and source != destination
                with Image.open(source) as image:
                    width = variant['width']
                    image.thumbnail((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
                    image.save(destination, format='WEBP', quality=84, method=6)
                written.add(variant['src'])
                print(destination.relative_to(ROOT))
        for row in rows:
            for variant in row['variants']:
                variant['bytes'] = (ROOT / variant['src']).stat().st_size
        (OUT / 'images.json').write_text(json.dumps(rows, indent=2) + '\n')


if __name__ == '__main__':
    main()
