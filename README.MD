# Prelude of the Chambered

This is a Typescript port of the game made by Markus 'Notch' Persson in August 2011, for the 21st edition of Ludum Dare's 48 hour game jam.

## The Story

This game is like Notch - a gem.

I just loved how he built an entire 2.5d raycasting renderer, in Java, out of thin air, with no external libraries, and then started adding features and balancing everything out to make it a really pleasant, albeit short experience, in a metroidvania-esque display of game design.

All that in less than 48 hours.

I've been yearning to learn Typescript for some time now, and also deepen my knowledge of game development - so I saw this as an opportunity to achieve both goals: To rewrite Notch's quirky pixel-matrix raster renderer into a similar alternative inside of a browser; And also to keep this piece of history alive by bringing it into a more modern tech playfield. Enjoy!

## The Port

To maintain its original spirit, this game is ported as-is, with as few changes as possible. However, due to language and architecture constraints, some adaptations have been made, such as:

* Rewriting the entire renderer, to work with HTML5 `Canvas`es, instead of Java's `BufferedImage`s;
* Writing some random number generation functions;
* Working around cyclic dependencies between classes;
* Shifting from ARGB to RGBA

And naturally, a few minor issues have arised and are still unfixed (for now):

* Sounds are reloaded every time they are played (even though they are cached by the browser);
* Focus checking on the Canvas doesn't work

However, every game feature and mechanic works as intended.

## Roadmap

No roadmap, actually. I plan on solving the remaning issues and maybe rewriting some code to conform to Typescript coding standards. Maybe extend the game? Add new features? Oh, the magic of open source!

## Running

Just run `yarn start` for a local development server. Or run `yarn build` for a bundled package.

## Credits

Notch, obviously. In the end, it's his code and assets.