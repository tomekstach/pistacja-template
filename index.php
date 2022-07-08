<?php
defined("_JEXEC") or die;
JLoader::import("twig.library");

$app 	= JFactory::getApplication();
$doc 	= JFactory::getDocument();
$user	= JFactory::getUser();
$lang	= JFactory::getLanguage();

$menu = $app->getMenu();
$basepath = dirname(__FILE__);

$this->language	= $doc->language;
$this->direction = $doc->direction;
$this->uri = $_SERVER["REQUEST_URI"];

// Remove jquery and bootstrap scripts
foreach ($this->_script as $key => $value) {
	if (strpos($value, 'jquery') !== false || strpos($value, 'jQuery') !== false) {
		unset($this->_script[$key]);
	}
}
foreach ($this->_scripts as $key => $value) {
	if (strpos($key, 'jquery') !== false || strpos($key, 'bootstrap') !== false) {
		unset($this->_scripts[$key]);
	}
}

$ogimag = $doc->getMetaData('ogimage');

if (empty($ogimag)) {
	$size = getimagesize(JPATH_BASE.'/images/pistacja_og.png');
	$doc->setMetadata('ogimage', JURI::root().'images/pistacja_og.png');
	$doc->setMetadata('ogwidth', $size[0]);
	$doc->setMetadata('ogheight', $size[1]);
	$doc->setMetadata('ogmime', $size['mime']);
}

$this->setTitle($this->getTitle() . " | " . ucfirst($app->get("sitename")));

// Detecting Active Variables.
$option = $app->input->getCmd("option", "");
$view = $app->input->getCmd("view", "");
$view	= !empty($view) ? "/".$view : "";

// Custom components scripts.
$customitems = array_unique($doc->_custom);

// Twig data.
$data = array(
	"menu" => $menu,
	"year" => date("Y"),
	"template" => $this,
	"option" => $option,
	"customitems" => $customitems
);

// Render Template.
echo Twig::render("@template/view.html.twig", $data);
