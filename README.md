# VSP.BERLIN website

This is a Jekyll-powered website for the VSP transport planning department at TU-Berlin.

## Editing pages - multilanguage

It is in **TWO LANGUAGES now** so if you want pages to be available in both English and German, you must add/edit two pages:

**Home page:** is at `/index.md` and `/_pages_en/index.md`

**Update pages (blog style):** are at `/_posts/2021-XX-XX-my-page.md` and `/_posts_en/2021-XX-XX-my-page.md`.

**Top Nav Bar:** In `_config.yml` edit the `navigation` list to add items to the top nav bar. Markdown files with the names listed there will be read from root and from `_pages_en`. _Be sure to change the title field in each page_ to match the language of the page!

The system will do its best to pick the right version of a page based on whether it exists in both languages and which version of the site you are visiting.

## Building the site locally

Jekyll requires Ruby 3.3.x installed so that the dependency bundler can find all the things:

- Install Ruby 3.3 for your system: on Mac homebrew this is `brew install ruby@3.3`
- Make sure the correct Ruby is in your PATH; I had to add to my .profile:
  - `export PATH="/opt/homebrew/opt/ruby/bin:$PATH"`
  - run "which ruby" to verify you are running Ruby 3.3
- Finally run `bundle install`. This installs all of the jekyll infrastructure. If this step has build errors, try deleting `Gemfile.lock` and trying again.

Now you can run locally:

- `bundle exec jekyll serve` and you have a hot server. Edit your files, go visit http://127.0.01:4000/ and reload to see your changes

## Publications page web-app

The Publications page is now a separate javascript app built with more interactivity than Jekyll can provide. It's built using Vue, the same platform we use for sounding board, simwrapper, everything....

Source code for this is in the `_publications_app` folder.  It gets built separately there, and then the built outputs are copied into the `publications` folder.

### To build/update the publications-app:

- Install Node LTS 20.x from https://node.dev
  - If you are in the future and recent Node versions don't work, use [nvm: node version manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) and run `nvm install 20` and `nvm use 20` to get version 20 specifically.
- cd into `_publications_app`
- run `npm ci` to install node project dependencies
- now you can run `npm run dev` to get a hot-reload dev server.

Make your changes and when things are working properly and want to merge it into the main site:

- `npm run build`
- `cp dist/assets/index*.js ../publications`

Now go back and run the Jekyll server as above and review your changes.

The CSS styling between the two often gets lost: I find that copying manually any new CSS from `_publications_app/src/App.vue` into `_sass/main.css` works best.

Have fun!

## Project pages

Every Markdown file gets converted to a URL and you can use this for single-page project pages. There are many examples in the `/projects` folder.

If you want to build a full **project website** instead of just a single landing page, you should create separate project repository and use the GitHub Pages instead.

**Here is how it works:**

Create a repository, go to its Settings / Pages panel on GitHub, and enable GitHub Pages for that repository.

- You can build from content on a branch or from a `/docs` folder. That branch or folder should contain the markdown files that you want to comprise your site.

- Choose a branch name, e.g. `main` or `gh-pages` or a folder. In a few minutes your site will be live already at https://vsp.berlin/repository-name

For example: There is a repository at github.com/matsim-vsp/avoev with a `gh-pages` branch. GitHub Pages serves the content from that `gh-pages` branch. That website is visible at https://vsp.berlin/avoev .

This GitHub Pages system supersedes any files you might have in the main vsp.berlin website such as /pave.md or /avoev.md.

It's a nice system actually: It means we can fully control websites for some projects, and also have simple landing pages for other projects without creating separate repositories for them.

GitHub pages uses Jekyll to convert markdown files to HTML. You can build very complex websites with Jekyll.

- See this link for more on [GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

..Billy

