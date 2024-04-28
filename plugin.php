<?php

/**
 * Plugin Name:       Infinite Team Members
 * Description:       Infinites team members grid.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Harvey Nighy
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       infinite-team-members
 * 
 * @package			  infinite
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function infinite_team_members_block_init() {
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'infinite_team_members_block_init');
