AUTHOR = 'Alireza Miryazdi (Xosrov)'
SITENAME = 'Alireza\'s Blog'
SITEURL = '/blog'
OUTPUT_PATH = '../blog'
MENUITEMS = [('CV', '/'), ('Blog', '/blog/')]
PATH = 'content'
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

THEME = "themes/pelican-cait"

TIMEZONE = 'UTC'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# NOTE: adding latex support: https://mollermara.com/blog/mathjax/
MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.toc': {
            'title': 'Table of contents:' 
        },
        'markdown.extensions.codehilite': {
            'css_class': 
            'highlight'
        },
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}