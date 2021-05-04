# VSP.BERLIN website

This is a Jekyll-powered website for the VSP transport planning department at TU-Berlin.

It is in **TWO LANGUAGES now** so if you want pages to be available in both English and German, you need to add or edit two pages:

**Home page:** is at `/index.md` and `/_pages_en/index.md`

**Update pages (blog style):** are at `/_posts/2021-XX-XX-my-page.md` and `/_posts_en/2021-XX-XX-my-page.md`.

**Top Nav Bar:** In `_config.yml` edit the `navigation` list to add items to the top nav bar. Markdown files with the names listed there will be read from root and from `_pages_en`. _Be sure to change the title field in each page_ to match the language of the page!

The system will do its best to pick the right version of a page based on whether it exists in both languages and which version of the site you are visiting.
