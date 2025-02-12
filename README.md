# WordPress Blocks Demo

This repo use [WordPress Playground](https://playground.wordpress.net/) to provide interactive examples of how to work with blocks in modern WordPress. The goal is to understand your options from core blocks to a fully custom block.

[![Launch in WordPress Playground](https://img.shields.io/badge/Launch%20in%20WordPress%20Playground-DA9A45?style=for-the-badge&logo=wordpress)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/smithjw1/wp-block-demo/trunk/blueprint.json)

## Core Blocks
WordPress comes with dozens of core blocks that support a huge number of editorial needs. You can control many aspects of core blocks with `theme.json` a file included with your WordPress theme. 

The [full specification](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/) is available. In this [repo](./theme/theme.json) there are two additions to the 2025 theme.json to demonstrate these abilities.

### Changing block settings

Each block can have custom settings, these are set under the top level [settings](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/#settings) object.

```json
{
    "settings": {
        "blocks": {
			"core/heading": {
				"color": {
					"custom": false,
					"text": false,
					"background": false
				}
			}
		},
    }
}
```

These changes prevent any changes to the text or background color of all heading elements. There are many settings available for each block. If you need more advanced governance based on user role or how blocks are nested the [VIP Block Governance](https://github.com/Automattic/vip-governance-plugin) plugin provides these options.

### Setting block styles

Default styles can also be set for specific blocks. These are set under the top level [styles](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/#styles) object.

```json
{
    "styles": {
        "blocks": {
			"core/heading": {
				"color": {
					"text": "var(--wp--custom--theme-news--color--general--brand-020)"
				}
			},
		},
    }
}
```

This change sets the text color to a specific preset. You can read more about these custom properties in the next section. When you combine explictly setting the color here with the settings changes above, you fix the text color of headings and make it impossible to change in the editor.

### Custom properties in theme.json

Often you have properties defined in your design system. These can include hex codes for colors, spacing defaults, even font sizes. theme.json provides the [custom](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/#custom) property under [settings](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/#settings) for these values. For example:

```json
{
    "settings": {
        "custom": {
                    "themeNews": {
                        "color": {
                            "general": {
                                "brand020": "#3a79bb",
                                "section060": "#2b5c8c"
                            },
                            "web": {
                                "brand030": "#a0c3e5"
                            }
                        }
                    }
                }
    }
}
```

The structure of the data under "custom" is totaly up to you. You can nest and set properties to match your needs. Then these properties can be referenced elsewhere in theme.json as:

`var(--wp--custom--theme-news--color--general--brand-020)`

The [VIP Design System Bridge](https://github.com/Automattic/vip-design-system-bridge/) takes advantage of these capabilities to bring Figma design tokens into theme.json.

## Patterns

Often design elements require more than one block to accomplish. [Patterns](https://developer.wordpress.org/themes/patterns/) allow you to create compositions of core blocks to meet your specifc needs. By using core blocks you can take advantage of all of WordPress and guarentee continued compatibility.

This repo contains a number of modifications to demonstrate the use of patterns.

### Removing core patterns

This demo uses the default 2025 theme. That theme registers a number of patterns. The child theme's [functions.php](./theme/functions.php) file removes these themes, core patterns, and remote patterns. This gives the demo a clean slate.

The function to remove theme patterns is not normally necessary but the filter for core themes may be generally helpful.

### Included patterns

The Teaser and Read More patterns demonstrate several block and pattern features:

 * **Block renaming** - Blocks can be given custom names to guide content creators in their use.
 * **Specific formatting** - Image sizes and headline formatting are specified.
 * **Block locking** - Blocks can be locked to prevent removal or movement.
 * **Content only locking** - Only the content can be edited, fully locking down the design.

Taken together these tools allow for the creation of a robust design system inside WordPress.

## Custom Blocks
Custom blocks are necessary when you need complete control. The world is your oyster. The cost is ongoing maintenance. As the block editor moves forward, your custom block may fall behind.

Included is a [custom block](./srd-monster/readme.txt) created using the [@wordpress/create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) package. It is designed to allow for the creation of monsters for tabletop role-playing games.

As you can see, there can be a significant code investment for even basic functionality. Custom blocks are the exact right tool for some jobs, but a sledgehammer for others.

## Remote Data Blocks

Remote Data Blocks is a WordPress plugin that makes it easy to combine content and remote data in the block editor. Easily register blocks that load data from Airtable, Google Sheets, Shopify, GitHub, or any other API. [Read more about well-supported use cases](https://github.com/Automattic/remote-data-blocks).

A [simple plugin](./api-monster.php) is included to demonstrate the use of remote data blocks. It also loads information about monsters from the open-source rules of Dungeons and Dragons.

Without this plugin, significant custom development would be necessary to retrieve, cache, and output this third-party information.

## Testing with WordPress playground
Because WordPress playground runs completely in the browser it is easy to create links to test this package with alternative WordPress configurations.

[With PHP 8.4](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/smithjw1/wp-block-demo/trunk/blueprint.json&php=8.4)

[With the nightly WP build](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/smithjw1/wp-block-demo/trunk/blueprint.json&wp=nightly)
