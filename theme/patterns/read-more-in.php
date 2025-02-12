<?php

/**
 * Title: Read More In
 * Slug: block-demo/read-more-in
 */
?>
<!-- wp:group {"metadata":{"name":"Read More IN"},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:post-terms {"term":"category","prefix":"READ MORE IN ","lock":{"move":true,"remove":true},"fontSize":"x-large"} /-->

    <!-- wp:columns {"isStackedOnMobile":false,"metadata":{"name":"Promos"}} -->
    <div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column {"width":"","templateLock":"contentOnly","metadata":{"name":"Promo 1"},"layout":{"type":"default"}} -->
        <div class="wp-block-column"><!-- wp:image {"aspectRatio":"4/3","scale":"contain"} -->
            <figure class="wp-block-image"><img alt="" style="aspect-ratio:4/3;object-fit:contain" /></figure>
            <!-- /wp:image -->

            <!-- wp:heading {"level":3,"style":{"layout":{"selfStretch":"fit","flexSize":null}},"fontSize":"large"} -->
            <h3 class="wp-block-heading has-large-font-size"><strong>KICKER</strong> Headline</h3>
            <!-- /wp:heading -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"templateLock":"contentOnly","metadata":{"name":"Promo 2"}} -->
        <div class="wp-block-column"><!-- wp:image {"aspectRatio":"4/3","scale":"contain","className":"is-resized"} -->
            <figure class="wp-block-image is-resized"><img alt="" style="aspect-ratio:4/3;object-fit:contain" /></figure>
            <!-- /wp:image -->

            <!-- wp:heading {"level":3,"style":{"layout":{"selfStretch":"fit","flexSize":null}},"fontSize":"large"} -->
            <h3 class="wp-block-heading has-large-font-size"><strong>KICKER</strong> Headline</h3>
            <!-- /wp:heading -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
