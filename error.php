<?php
	if ($_SERVER['HTTPS'] === 'on') {
		$protocol = 'https://';
	}
	else {
		$protocol = 'http://';
	}
?>
<!doctype html>
<html class="no-js" lang="pl">
<head>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<base href="<?php echo $protocol.$_SERVER['HTTP_HOST'].str_replace('index.php', '', $_SERVER['PHP_SELF']);?>" target="_blank">
	<link rel="shortcut icon" href="<?php echo $this->baseurl . '/templates/' . $this->template . '/favicon.ico';?>" type="image/vnd.microsoft.icon" />
	<link rel="icon" href="<?php echo $this->baseurl . '/templates/' . $this->template . '/favicon.ico';?>" sizes="16x16" />
	<link rel="apple-touch-icon-precomposed" href="<?php echo $this->baseurl . '/templates/' . $this->template . '/images/pistacja-180x180.png';?>" />
	<meta name="msapplication-TileImage" content="<?php echo $this->baseurl . '/templates/' . $this->template . '/images/pistacja-270x270.png';?>" />
	<link rel="stylesheet" href="<?php echo $this->baseurl . '/templates/' . $this->template . '/css/main.css';?>" type="text/css" />
</head>
<body>
	<section class="pie-error">
		<img class="pie-error-bubble" src="./templates/pistacja/images/purple-spot.svg" alt="">
		<h1>4<img src="./templates/pistacja/images/pistacja.svg" alt="pistacja">4</h1>
		<img class="pie-error-empty" src="./templates/pistacja/images/empty.png" alt="404">
		<h3>Oooops! Wygląda na to, że ten worek jest pusty.<br> Spróbuj może któregoś z linków poniżej:</h3>
		<div class="pie-error-links">
			<a href="./">Strona główna</a> <span>|</span>
			<a href="./inspiracje">Inspiracje</a> <span>|</span>
			<a href="./wyniki-wyszukiwania?tlevel=0&tsubject=0&ttype=6">Lista wideolekcji</a>
		</div>
	</section>
</body>
</html>
