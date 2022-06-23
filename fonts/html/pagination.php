<?php
/**
 * @package     Joomla.Site
 * @subpackage  Templates.protostar
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * This is a file to add template specific chrome to pagination rendering.
 *
 * pagination_list_footer
 * 	Input variable $list is an array with offsets:
 * 		$list[limit]		: int
 * 		$list[limitstart]	: int
 * 		$list[total]		: int
 * 		$list[limitfield]	: string
 * 		$list[pagescounter]	: string
 * 		$list[pageslinks]	: string
 *
 * pagination_list_render
 * 	Input variable $list is an array with offsets:
 * 		$list[all]
 * 			[data]		: string
 * 			[active]	: boolean
 * 		$list[start]
 * 			[data]		: string
 * 			[active]	: boolean
 * 		$list[previous]
 * 			[data]		: string
 * 			[active]	: boolean
 * 		$list[next]
 * 			[data]		: string
 * 			[active]	: boolean
 * 		$list[end]
 * 			[data]		: string
 * 			[active]	: boolean
 * 		$list[pages]
 * 			[{PAGE}][data]		: string
 * 			[{PAGE}][active]	: boolean
 *
 * pagination_item_active
 * 	Input variable $item is an object with fields:
 * 		$item->base	: integer
 * 		$item->link	: string
 * 		$item->text	: string
 *
 * pagination_item_inactive
 * 	Input variable $item is an object with fields:
 * 		$item->base	: integer
 * 		$item->link	: string
 * 		$item->text	: string
 *
 * This gives template designers ultimate control over how pagination is rendered.
 *
 * NOTE: If you override pagination_item_active OR pagination_item_inactive you MUST override them both
 */

/**
 * Renders the pagination footer
 *
 * @param   array   $list  Array containing pagination footer
 *
 * @return  string         HTML markup for the full pagination footer
 *
 * @since   3.0
 */
function pagination_list_footer($list)
{
	$html = "<div class=\"pagination\">\n";
	// $html .= $list['pageslinks'];
	$html .= "\n<input type=\"hidden\" name=\"" . $list['prefix'] . "limitstart\" value=\"" . $list['limitstart'] . "\" />";
	$html .= "\n</div>";

	return $html;
}

/**
 * Renders the pagination list
 *
 * @param   array   $list  Array containing pagination information
 *
 * @return  string         HTML markup for the full pagination object
 *
 * @since   3.0
 */
function pagination_list_render($list)
{
	// Initialize variables
	$html = '<ul class="pagination__list">';
	$html .= $list['start']['data'];
	$html .= $list['previous']['data'];
 	$i = 1;
 	$cnt = count($list['pages']);
 	foreach($list['pages'] as $p => $page) {

 			if ($i == 1) {
 					preg_match('#s=(\d+)#', $page['data'], $current_start);
 					preg_match('#s=(\d+)#', $list['start']['data'], $first_start);

 					if($current_start[1] > $first_start[1]) {
 						$html .= preg_replace('#(<a.*?>).*?(</a>)#','$1...$2',$page['data']);
 					} else {
 						$html .= $page['data'];
 					}

			} else if($i == $cnt) {
 					preg_match('#s=(\d+)#', $page['data'], $current_start);
 					preg_match('#s=(\d+)#', $list['end']['data'], $last_start);

 					if($current_start[1] < $last_start[1]) {
 						$html .= preg_replace('#(<a.*?>).*?(</a>)#','$1...$2',$page['data']);
 					} else {
 						$html .= $page['data'];
  					}
			} else {
 				$html .= $page['data'];
 			}
			$i++;
	}
	$html .= $list['next']['data'];
	$html .= $list['end']['data'];

	$html .= '</ul>';
	return $html;
}

/**
 * Renders an active item in the pagination block
 *
 * @param   JPaginationObject  $item  The current pagination object
 *
 * @return  string                    HTML markup for active item
 *
 * @since   3.0
 */
function pagination_item_active(&$item)
{
	$class = '';

	// Check for "Start" item
	if ($item->text == JText::_('JLIB_HTML_START'))
	{
		$display = JText::_('JLIB_HTML_START');
		$class   = ' class="pagination__list__item bubble-button"';
	}

	// Check for "Prev" item
	if ($item->text == JText::_('JPREV'))
	{
		$display = '<i class="material-icons">keyboard_arrow_left</i>';
	}

	// Check for "Next" item
	if ($item->text == JText::_('JNEXT'))
	{
		$display = '<i class="material-icons">keyboard_arrow_right</i>';
	}

	// Check for "End" item
	if ($item->text == JText::_('JLIB_HTML_END'))
	{
		$display = JText::_('JLIB_HTML_END');
		$class   = ' class="pagination__list__item bubble-button"';
	}

	// If the display object isn't set already, just render the item with its text
	if (!isset($display))
	{
		$display = $item->text;
		$class   = ' class="pagination__list__item bubble-button"';
  }

	$link_array = explode('&amp;', explode('?', $item->link)[1]);

	foreach ($link_array as $key => $link) {
		$array = explode('=', $link);
		if ($array[0] == 's') {
			unset($link_array[$key]);
		}
		else {
			if (substr($array[0], -5) == 'start') {
				$array[0] = substr($array[0], 0, -5).'s';
			}
			elseif (substr($array[0], -10) == 'limitstart') {
				$array[0] = substr($array[0], 0, -10).'s';
			}
			$link_array[$key] = implode('=', $array);
		}
	}

	if (count($link_array) > 0) {
    $item->link = explode('?', $item->link)[0] . '?' . implode('&amp;', $link_array);
  } else {
    $item->link = explode('?', $item->link)[0];
  }

	return '<li' . $class . '><a title="' . $item->text . '" href="' . $item->link . '" class="pagenav">' . $display . '</a></li>';
}

/**
 * Renders an inactive item in the pagination block
 *
 * @param   JPaginationObject  $item  The current pagination object
 *
 * @return  string  HTML markup for inactive item
 *
 * @since   3.0
 */
function pagination_item_inactive(&$item)
{
	// Check for "Start" item
	if ($item->text == JText::_('JLIB_HTML_START'))
	{
		return '<li class="disabled"><a><span class="icon-first"></span></a></li>';
	}

	// Check for "Prev" item
	if ($item->text == JText::_('JPREV'))
	{
		return '<li class="disabled"><a><i class="material-icons">keyboard_arrow_left</i></a></li>';
	}

	// Check for "Next" item
	if ($item->text == JText::_('JNEXT'))
	{
		return '<li class="disabled"><a><i class="material-icons">keyboard_arrow_right</i></a></li>';
	}

	// Check for "End" item
	if ($item->text == JText::_('JLIB_HTML_END'))
	{
		return '<li class="disabled"><a><span class="icon-last"></span></a></li>';
	}

	// Check if the item is the active page
	if (isset($item->active) && ($item->active))
	{
		return '<li class="active pagination__list__item bubble-button"><a>' . $item->text . '</a></li>';
	}

	// Doesn't match any other condition, render a normal item
	return '<li class="disabled pagination__list__item bubble-button"><a>' . $item->text . '</a></li>';
}
