<?php
/**
 * ref: http://www.luster.io/blog/9-29-14-mobile-web-checklist.html
 * ref: http://www.script-tutorials.com/responsive-website-using-angularjs/
 * ref: http://medialoot.com/blog/how-to-create-a-responsive-navigation-menu-using-only-css/
 */

$appConfig = array(
	'lang' => 'en'
);

// Mini-action handler here for switching languages; anything else needed?
if (isset($_REQUEST['formAction'])) {
	switch ($_REQUEST['formAction']) {
		case 'doLanguageChange':
			$appConfig['lang'] = $_REQUEST['lang'];
			break;
	}
}

// Pass appConfig into JS; numeric or string only, please
$appConfigJS = '';
foreach ($appConfig as $setting => $value) {

	// String values are escaped and quoted; numbers are literal
	$valueJS = (gettype($value) == 'string') ? "'" . escapeJSString($value) . "'" : $value;

	$appConfigJS .=  "appConfig.{$setting} = {$valueJS};\n";
}

/**
 * Escape a string for quoting in JavaScript
 */
function escapeJSString($str, $delim="'") {
	// If the value has any escape (backslash) chars in it, escape them
	$str = str_replace("\\", "\\\\", $str);

	// Now escape any occurrences of the string delimiter (should be either ' or ")
	$str = str_replace($delim, "\\{$delim}" , $str);

	return $str;
}

?>
<!DOCTYPE HTML>
<!--[if lt IE 7]><html lang="en" ng-app="angularApp" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html lang="en" ng-app="angularApp" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html lang="en" ng-app="angularApp" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html lang="en" ng-app="angularApp" class="no-js"><!--<![endif]-->
	<head>
		<title>Angular App</title>

		<meta charset="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="description" content=""/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<!-- BEGIN Mobile Optimizations -->

			<!-- Microsoft cleat-type enablement -->
				<meta http-equiv="cleartype" content="on"/>

			<!-- Prevent scaling -->
				<meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"/>

			<!-- Hide browser chrome if/when possible -->
				<!-- android -->
				<meta name="mobile-web-app-capable" content="yes"/>
				<!-- iOS -->
				<meta name="apple-mobile-web-app-capable" content="yes"/>
				<meta name="apple-mobile-web-app-status-bar-style" content="translucent-black"/>
				<meta name="apple-mobile-web-app-title" content="My App"/>
		<!-- END Mobile Optimizations -->

		<script src="config.js"></script>
		<script type="text/javascript">
			// Config augmented by server-side code
			<?=$appConfigJS?>
		</script>

		<!-- Google Analytics -->
		<script async src='//www.google-analytics.com/analytics.js'></script>
		<script>
			// Conditionally enable GA if we have a siteID defined in the appConfig
			if (appConfig.googleAnalyticsSiteId.length && (appConfig.googleAnalyticsSiteId.length > 0)) {
				window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
				ga('create', appConfig.googleAnalyticsSiteId, 'auto');
				ga('send', 'pageview');
			}
		</script>
		<!-- End Google Analytics -->

		<link rel="stylesheet" href="bower_components/html5-boilerplate/css/normalize.css"/>
		<link rel="stylesheet" href="bower_components/html5-boilerplate/css/main.css"/>
		<link rel="stylesheet" href="assets/css/app.css"/>
		<link rel="stylesheet" href="assets/css/menu.css"/>

		<script src="bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js"></script>
	</head>
	<body>
		<div id="appheader">
			<div class="layoutbar">
				<ng-include src="'app/components/header/header.html'"></ng-include>
			</div>
		</div>

		<div id="appcontent">
			<div class="layoutbar">

				<!--[if lt IE 7]>
				<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
				<![endif]-->

				<div ng-view></div>
			</div>
		</div>

		<div id="appfooter">
			<div class="layoutbar">
				<ng-include src="'app/components/footer/footer.html'"></ng-include>
			</div>
		</div>

		<!-- In production use:
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/x.x.x/angular.min.js"></script>
		-->
		<script src="bower_components/angular/angular.js"></script>
		<script src="bower_components/angular-route/angular-route.js"></script>
		<script src="bower_components/angular-gettext/dist/angular-gettext.min.js"></script>
		<script src="assets/js/angular-app.js"></script>
	</body>
</html>

