var lang = $.cookie('lang');
if (typeof(lang) == 'undefined') lang = 'en';
appConfig['lang'] = lang;

function msSetLanguage(lang) {
	$.cookie('lang', lang, { expires: 365 });
	window.location.reload();
}

