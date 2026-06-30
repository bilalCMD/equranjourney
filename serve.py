#!/usr/bin/env python3
"""Local preview server for eQuran Journey with clean URLs (no .html).
Run:  python serve.py     →  http://localhost:8080
Maps /about -> about.html, /header -> header.html, etc. (like Hostinger)."""
import http.server, socketserver, os, posixpath

PORT = 8080

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        raw = self.path.split('?', 1)[0].split('#', 1)[0]
        # if no file extension and not root, try <path>.html
        if raw != '/' and not posixpath.splitext(raw)[1]:
            candidate = raw.lstrip('/') + '.html'
            if os.path.isfile(candidate):
                self.path = '/' + candidate
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), CleanURLHandler) as httpd:
        print('eQuran Journey running at  http://localhost:%d' % PORT)
        print('Press Ctrl+C to stop.')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nStopped.')
