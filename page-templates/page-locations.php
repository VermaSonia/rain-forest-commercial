<?php
  global $post;
/*
  Template Name: Locations
*/
/**
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Rain Forest Commercial
 */

$locationArgs = [
  'post_type' => 'location',
  'post_status' => 'publish',
  'posts_per_page' => -1,
  'order'  => 'ASC',
];


/****************************************************
 * STORE ALL LOGIC IN CONTEXT AND OUTPUT TO VIEW
 ***************************************************/
$context = Timber::context();
$context['field'] = Timber::get_post();
$context['locations'] = Timber::get_posts($locationArgs);
$templates = array( 'page-locations-served.twig' );
Timber::render( $templates, $context );




