# VSP.BERLIN website

This is a Jekyll-powered website for the VSP transport planning department at TU-Berlin.

It is in **TWO LANGUAGES now** so if you want pages to be available in both English and German, you need to add or edit two pages:

**Home page:** is at `/index.md` and `/_pages_en/index.md`

**Update pages (blog style):** are at `/_posts/2021-XX-XX-my-page.md` and `/_posts_en/2021-XX-XX-my-page.md`.

**Top Nav Bar:** In `_config.yml` edit the `navigation` list to add items to the top nav bar. Markdown files with the names listed there will be read from root and from `_pages_en`. _Be sure to change the title field in each page_ to match the language of the page!

The system will do its best to pick the right version of a page based on whether it exists in both languages and which version of the site you are visiting.


## Building site locally

You need Ruby 3.3.0 installed, so that the dependency bundler can install all the things:

- Install Ruby 3.3.0 for your system
  - On Mac homebrew this is `brew install ruby@3.3`
  - Or `rbenv install 3.3.0` and `rbenv global 3.3.0`
- `bundle install`. If this step has build errors, try deleted `Gemfile.lock` and trying again.

Now you can run locally:

- `bundle exec jekyll serve`
