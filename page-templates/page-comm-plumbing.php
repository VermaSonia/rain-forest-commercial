<?php
  global $post;
/*
  Template Name: Commmercial Plumbing
*/
/**
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Rain Forest Commercial
 */

/****************************************************
 * STORE ALL LOGIC IN CONTEXT AND OUTPUT TO VIEW
 ***************************************************/
$context = Timber::context();
$context['field'] = Timber::get_post();
$templates = array( 'page-comm-plumbing.twig' );
Timber::render( $templates, $context );



