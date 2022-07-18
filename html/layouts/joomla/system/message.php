<?php
/**
 * @package     Joomla.Site
 * @subpackage  Template.protostar
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$messages = $displayData['msgList'];

// FIXME: Hardcoded!
if (!isset($type)) $type = 'error';

$alert = array(
  'error' => 'error',
  'warning' => 'warning',
  'notice' => 'info',
  'message' => 'success'
);

?>

<?php if (is_array($messages) && !empty($messages)) : ?>
  <div class="system-messages">
    <?php foreach ($messages as $type => $msgs) : ?>
    <div class="system-messages-content <?php echo $alert[$type]; ?>">
      <button class="system-messages-close pie-icon-close-18" data-close="true"></button>
      <span class="system-messages-label"><?php echo JText::_($type); ?></span>
      <div class="system-messages-text">
        <?php foreach ($msgs as $msg) : ?>
          <p><?php echo $msg; ?></p>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>
