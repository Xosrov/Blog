AUTHOR = 'Alireza Miryazdi (Xosrov)'
SITENAME = 'Aliz Blog'
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

USE_CUSTOM_MENU = True
CUSTOM_MENUITEMS = (('Blog', ''),
                    ('Contact', 'pages/contact.html'),
                    ('CV', '..'))

CONTACT_EMAIL = "seyed.alireza.miryazdi@gmail.com"
CONTACTS = (('github', 'https://github.com/Xosrov'),
            ('linkedin', 'https://www.linkedin.com/in/alireza-miryazdi/'),)


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
            'css_class': 'highlight'
        },
        "pymdownx.mark": {},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}