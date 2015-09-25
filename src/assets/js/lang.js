var lang = $.cookie('lang');
if (typeof(lang) == 'undefined') lang = 'en';
appConfig['lang'] = lang;

function aaSetLanguage(lang) {
	$.cookie('lang', lang, { expires: 365 });
	window.location.reload();
}

