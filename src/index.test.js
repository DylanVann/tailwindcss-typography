const tailwind = require('tailwindcss')
const snapshotDiff = require('snapshot-diff')
const postcss = require('postcss')
const typographyPlugin = require('.')

function run(options = {}, config = {}) {
  return postcss([tailwind({ ...config, corePlugins: [], plugins: [typographyPlugin(options)] })])
    .process(['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n'), {
      from: undefined,
    })
    .then((result) => result.css)
}

async function diffOnly(options = {}, config = {}) {
  const [before, after] = await Promise.all([run(), run(options, config)])

  return `\n\n${snapshotDiff(before, after, {
    aAnnotation: '__REMOVE_ME__',
    bAnnotation: '__REMOVE_ME__',
    contextLines: 0,
  })
    .replace(/\n\n@@([^@@]*)@@/g, '') // Top level @@ signs
    .replace(/@@([^@@]*)@@/g, '\n---\n') // In between @@ signs
    .replace(/[-+] __REMOVE_ME__\n/g, '')
    .replace(/Snapshot Diff:\n/g, '')
    .replace(/"/g, "'")
    .split('\n')
    .map((line) => `  ${line}`.trimEnd())
    .join('\n')}\n\n`
}

it('should generate the default classes for the typography components', async () => {
  expect(await run()).toMatchInlineSnapshot(`
    ".prose {
      color: #374151;
      max-width: 65ch;
    }

    .prose [class~=\\"lead\\"] {
      color: #4b5563;
      font-size: 1.25em;
      line-height: 1.6;
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose a[data-prose=\\"true\\"] {
      color: #111827;
      text-decoration: underline;
      font-weight: 500;
    }

    .prose strong[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 600;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"A\\"] {
      --list-counter-style: upper-alpha;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"a\\"] {
      --list-counter-style: lower-alpha;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"A\\" s] {
      --list-counter-style: upper-alpha;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"a\\" s] {
      --list-counter-style: lower-alpha;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"I\\"] {
      --list-counter-style: upper-roman;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"i\\"] {
      --list-counter-style: lower-roman;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"I\\" s] {
      --list-counter-style: upper-roman;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"i\\" s] {
      --list-counter-style: lower-roman;
    }

    .prose ol[data-prose=\\"true\\"][type=\\"1\\"] {
      --list-counter-style: decimal;
    }

    .prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      position: relative;
      padding-left: 1.75em;
    }

    .prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
      position: absolute;
      font-weight: 400;
      color: #6b7280;
      left: 0;
    }

    .prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      position: relative;
      padding-left: 1.75em;
    }

    .prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      content: \\"\\";
      position: absolute;
      background-color: #d1d5db;
      border-radius: 50%;
      width: 0.375em;
      height: 0.375em;
      top: calc(0.875em - 0.1875em);
      left: 0.25em;
    }

    .prose hr[data-prose=\\"true\\"] {
      border-color: #e5e7eb;
      border-top-width: 1px;
      margin-top: 3em;
      margin-bottom: 3em;
    }

    .prose blockquote[data-prose=\\"true\\"] {
      font-weight: 500;
      font-style: italic;
      color: #111827;
      border-left-width: 0.25rem;
      border-left-color: #e5e7eb;
      quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
      margin-top: 1.6em;
      margin-bottom: 1.6em;
      padding-left: 1em;
    }

    .prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:first-of-type::before {
      content: open-quote;
    }

    .prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:last-of-type::after {
      content: close-quote;
    }

    .prose h1[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 800;
      font-size: 2.25em;
      margin-top: 0;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }

    .prose h1[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
      font-weight: 900;
    }

    .prose h2[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 700;
      font-size: 1.5em;
      margin-top: 2em;
      margin-bottom: 1em;
      line-height: 1.3333333;
    }

    .prose h2[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
      font-weight: 800;
    }

    .prose h3[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 600;
      font-size: 1.25em;
      margin-top: 1.6em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }

    .prose h3[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
      font-weight: 700;
    }

    .prose h4[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.5;
    }

    .prose h4[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
      font-weight: 700;
    }

    .prose figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
      color: #6b7280;
      font-size: 0.875em;
      line-height: 1.4285714;
      margin-top: 0.8571429em;
    }

    .prose code[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 600;
      font-size: 0.875em;
    }

    .prose code[data-prose=\\"true\\"]::before {
      content: \\"\`\\";
    }

    .prose code[data-prose=\\"true\\"]::after {
      content: \\"\`\\";
    }

    .prose a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #111827;
    }

    .prose pre[data-prose=\\"true\\"] {
      color: #e5e7eb;
      background-color: #1f2937;
      overflow-x: auto;
      font-size: 0.875em;
      line-height: 1.7142857;
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
      border-radius: 0.375rem;
      padding-top: 0.8571429em;
      padding-right: 1.1428571em;
      padding-bottom: 0.8571429em;
      padding-left: 1.1428571em;
    }

    .prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      background-color: transparent;
      border-width: 0;
      border-radius: 0;
      padding: 0;
      font-weight: 400;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
    }

    .prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::before {
      content: none;
    }

    .prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::after {
      content: none;
    }

    .prose table[data-prose=\\"true\\"] {
      width: 100%;
      table-layout: auto;
      text-align: left;
      margin-top: 2em;
      margin-bottom: 2em;
      font-size: 0.875em;
      line-height: 1.7142857;
    }

    .prose thead[data-prose=\\"true\\"] {
      color: #111827;
      font-weight: 600;
      border-bottom-width: 1px;
      border-bottom-color: #d1d5db;
    }

    .prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
      vertical-align: bottom;
      padding-right: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-left: 0.5714286em;
    }

    .prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"] {
      border-bottom-width: 1px;
      border-bottom-color: #e5e7eb;
    }

    .prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"]:last-child {
      border-bottom-width: 0;
    }

    .prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
      vertical-align: top;
      padding-top: 0.5714286em;
      padding-right: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-left: 0.5714286em;
    }

    .prose {
      font-size: 1rem;
      line-height: 1.75;
    }

    .prose p[data-prose=\\"true\\"] {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose img[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose video[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose figure[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose figure[data-prose=\\"true\\"] > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.875em;
    }

    .prose h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.9em;
    }

    .prose ol[data-prose=\\"true\\"] {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose ul[data-prose=\\"true\\"] {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose li[data-prose=\\"true\\"] {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    .prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.25em;
    }

    .prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.25em;
    }

    .prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.25em;
    }

    .prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.25em;
    }

    .prose ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .prose ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    .prose hr[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose h2[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose h3[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose h4[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose > :first-child {
      margin-top: 0;
    }

    .prose > :last-child {
      margin-bottom: 0;
    }

    .prose-sm {
      font-size: 0.875rem;
      line-height: 1.7142857;
    }

    .prose-sm p[data-prose=\\"true\\"] {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm [class~=\\"lead\\"] {
      font-size: 1.2857143em;
      line-height: 1.5555556;
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-sm blockquote[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
      padding-left: 1.1111111em;
    }

    .prose-sm h1[data-prose=\\"true\\"] {
      font-size: 2.1428571em;
      margin-top: 0;
      margin-bottom: 0.8em;
      line-height: 1.2;
    }

    .prose-sm h2[data-prose=\\"true\\"] {
      font-size: 1.4285714em;
      margin-top: 1.6em;
      margin-bottom: 0.8em;
      line-height: 1.4;
    }

    .prose-sm h3[data-prose=\\"true\\"] {
      font-size: 1.2857143em;
      margin-top: 1.5555556em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }

    .prose-sm h4[data-prose=\\"true\\"] {
      margin-top: 1.4285714em;
      margin-bottom: 0.5714286em;
      line-height: 1.4285714;
    }

    .prose-sm img[data-prose=\\"true\\"] {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm video[data-prose=\\"true\\"] {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm figure[data-prose=\\"true\\"] {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm figure[data-prose=\\"true\\"] > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-sm figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
      font-size: 0.8571429em;
      line-height: 1.3333333;
      margin-top: 0.6666667em;
    }

    .prose-sm code[data-prose=\\"true\\"] {
      font-size: 0.8571429em;
    }

    .prose-sm h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.9em;
    }

    .prose-sm h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.8888889em;
    }

    .prose-sm pre[data-prose=\\"true\\"] {
      font-size: 0.8571429em;
      line-height: 1.6666667;
      margin-top: 1.6666667em;
      margin-bottom: 1.6666667em;
      border-radius: 0.25rem;
      padding-top: 0.6666667em;
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm ol[data-prose=\\"true\\"] {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm ul[data-prose=\\"true\\"] {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm li[data-prose=\\"true\\"] {
      margin-top: 0.2857143em;
      margin-bottom: 0.2857143em;
    }

    .prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.5714286em;
    }

    .prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      left: 0;
    }

    .prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.5714286em;
    }

    .prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      height: 0.3571429em;
      width: 0.3571429em;
      top: calc(0.8571429em - 0.1785714em);
      left: 0.2142857em;
    }

    .prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }

    .prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.1428571em;
    }

    .prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.1428571em;
    }

    .prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.1428571em;
    }

    .prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.1428571em;
    }

    .prose-sm ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-sm ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .prose-sm ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-sm ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }

    .prose-sm hr[data-prose=\\"true\\"] {
      margin-top: 2.8571429em;
      margin-bottom: 2.8571429em;
    }

    .prose-sm hr[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-sm h2[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-sm h3[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-sm h4[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-sm table[data-prose=\\"true\\"] {
      font-size: 0.8571429em;
      line-height: 1.5;
    }

    .prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
      padding-top: 0.6666667em;
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-sm > :first-child {
      margin-top: 0;
    }

    .prose-sm > :last-child {
      margin-bottom: 0;
    }

    .prose-lg {
      font-size: 1.125rem;
      line-height: 1.7777778;
    }

    .prose-lg p[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg [class~=\\"lead\\"] {
      font-size: 1.2222222em;
      line-height: 1.4545455;
      margin-top: 1.0909091em;
      margin-bottom: 1.0909091em;
    }

    .prose-lg blockquote[data-prose=\\"true\\"] {
      margin-top: 1.6666667em;
      margin-bottom: 1.6666667em;
      padding-left: 1em;
    }

    .prose-lg h1[data-prose=\\"true\\"] {
      font-size: 2.6666667em;
      margin-top: 0;
      margin-bottom: 0.8333333em;
      line-height: 1;
    }

    .prose-lg h2[data-prose=\\"true\\"] {
      font-size: 1.6666667em;
      margin-top: 1.8666667em;
      margin-bottom: 1.0666667em;
      line-height: 1.3333333;
    }

    .prose-lg h3[data-prose=\\"true\\"] {
      font-size: 1.3333333em;
      margin-top: 1.6666667em;
      margin-bottom: 0.6666667em;
      line-height: 1.5;
    }

    .prose-lg h4[data-prose=\\"true\\"] {
      margin-top: 1.7777778em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }

    .prose-lg img[data-prose=\\"true\\"] {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg video[data-prose=\\"true\\"] {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg figure[data-prose=\\"true\\"] {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg figure[data-prose=\\"true\\"] > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-lg figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
      font-size: 0.8888889em;
      line-height: 1.5;
      margin-top: 1em;
    }

    .prose-lg code[data-prose=\\"true\\"] {
      font-size: 0.8888889em;
    }

    .prose-lg h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.8666667em;
    }

    .prose-lg h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.875em;
    }

    .prose-lg pre[data-prose=\\"true\\"] {
      font-size: 0.8888889em;
      line-height: 1.75;
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 0.375rem;
      padding-top: 1em;
      padding-right: 1.5em;
      padding-bottom: 1em;
      padding-left: 1.5em;
    }

    .prose-lg ol[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg ul[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg li[data-prose=\\"true\\"] {
      margin-top: 0.6666667em;
      margin-bottom: 0.6666667em;
    }

    .prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.6666667em;
    }

    .prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      left: 0;
    }

    .prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.6666667em;
    }

    .prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      width: 0.3333333em;
      height: 0.3333333em;
      top: calc(0.8888889em - 0.1666667em);
      left: 0.2222222em;
    }

    .prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-lg ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-lg ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .prose-lg ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-lg ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-lg hr[data-prose=\\"true\\"] {
      margin-top: 3.1111111em;
      margin-bottom: 3.1111111em;
    }

    .prose-lg hr[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-lg h2[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-lg h3[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-lg h4[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-lg table[data-prose=\\"true\\"] {
      font-size: 0.8888889em;
      line-height: 1.5;
    }

    .prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
      padding-right: 0.75em;
      padding-bottom: 0.75em;
      padding-left: 0.75em;
    }

    .prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
      padding-top: 0.75em;
      padding-right: 0.75em;
      padding-bottom: 0.75em;
      padding-left: 0.75em;
    }

    .prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-lg > :first-child {
      margin-top: 0;
    }

    .prose-lg > :last-child {
      margin-bottom: 0;
    }

    .prose-xl {
      font-size: 1.25rem;
      line-height: 1.8;
    }

    .prose-xl p[data-prose=\\"true\\"] {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl [class~=\\"lead\\"] {
      font-size: 1.2em;
      line-height: 1.5;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    .prose-xl blockquote[data-prose=\\"true\\"] {
      margin-top: 1.6em;
      margin-bottom: 1.6em;
      padding-left: 1.0666667em;
    }

    .prose-xl h1[data-prose=\\"true\\"] {
      font-size: 2.8em;
      margin-top: 0;
      margin-bottom: 0.8571429em;
      line-height: 1;
    }

    .prose-xl h2[data-prose=\\"true\\"] {
      font-size: 1.8em;
      margin-top: 1.5555556em;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }

    .prose-xl h3[data-prose=\\"true\\"] {
      font-size: 1.5em;
      margin-top: 1.6em;
      margin-bottom: 0.6666667em;
      line-height: 1.3333333;
    }

    .prose-xl h4[data-prose=\\"true\\"] {
      margin-top: 1.8em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }

    .prose-xl img[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl video[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl figure[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl figure[data-prose=\\"true\\"] > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
      font-size: 0.9em;
      line-height: 1.5555556;
      margin-top: 1em;
    }

    .prose-xl code[data-prose=\\"true\\"] {
      font-size: 0.9em;
    }

    .prose-xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.8611111em;
    }

    .prose-xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.9em;
    }

    .prose-xl pre[data-prose=\\"true\\"] {
      font-size: 0.9em;
      line-height: 1.7777778;
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 0.5rem;
      padding-top: 1.1111111em;
      padding-right: 1.3333333em;
      padding-bottom: 1.1111111em;
      padding-left: 1.3333333em;
    }

    .prose-xl ol[data-prose=\\"true\\"] {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl ul[data-prose=\\"true\\"] {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl li[data-prose=\\"true\\"] {
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    .prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.8em;
    }

    .prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      left: 0;
    }

    .prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.8em;
    }

    .prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      width: 0.35em;
      height: 0.35em;
      top: calc(0.9em - 0.175em);
      left: 0.25em;
    }

    .prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
      margin-top: 0.8em;
      margin-bottom: 0.8em;
    }

    .prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.2em;
    }

    .prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.2em;
    }

    .prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.2em;
    }

    .prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.2em;
    }

    .prose-xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .prose-xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
      margin-top: 0.8em;
      margin-bottom: 0.8em;
    }

    .prose-xl hr[data-prose=\\"true\\"] {
      margin-top: 2.8em;
      margin-bottom: 2.8em;
    }

    .prose-xl hr[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-xl h2[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-xl h3[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-xl h4[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-xl table[data-prose=\\"true\\"] {
      font-size: 0.9em;
      line-height: 1.5555556;
    }

    .prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
      padding-right: 0.6666667em;
      padding-bottom: 0.8888889em;
      padding-left: 0.6666667em;
    }

    .prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
      padding-top: 0.8888889em;
      padding-right: 0.6666667em;
      padding-bottom: 0.8888889em;
      padding-left: 0.6666667em;
    }

    .prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-xl > :first-child {
      margin-top: 0;
    }

    .prose-xl > :last-child {
      margin-bottom: 0;
    }

    .prose-2xl {
      font-size: 1.5rem;
      line-height: 1.6666667;
    }

    .prose-2xl p[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl [class~=\\"lead\\"] {
      font-size: 1.25em;
      line-height: 1.4666667;
      margin-top: 1.0666667em;
      margin-bottom: 1.0666667em;
    }

    .prose-2xl blockquote[data-prose=\\"true\\"] {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
      padding-left: 1.1111111em;
    }

    .prose-2xl h1[data-prose=\\"true\\"] {
      font-size: 2.6666667em;
      margin-top: 0;
      margin-bottom: 0.875em;
      line-height: 1;
    }

    .prose-2xl h2[data-prose=\\"true\\"] {
      font-size: 2em;
      margin-top: 1.5em;
      margin-bottom: 0.8333333em;
      line-height: 1.0833333;
    }

    .prose-2xl h3[data-prose=\\"true\\"] {
      font-size: 1.5em;
      margin-top: 1.5555556em;
      margin-bottom: 0.6666667em;
      line-height: 1.2222222;
    }

    .prose-2xl h4[data-prose=\\"true\\"] {
      margin-top: 1.6666667em;
      margin-bottom: 0.6666667em;
      line-height: 1.5;
    }

    .prose-2xl img[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl video[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl figure[data-prose=\\"true\\"] {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl figure[data-prose=\\"true\\"] > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-2xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
      font-size: 0.8333333em;
      line-height: 1.6;
      margin-top: 1em;
    }

    .prose-2xl code[data-prose=\\"true\\"] {
      font-size: 0.8333333em;
    }

    .prose-2xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.875em;
    }

    .prose-2xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      font-size: 0.8888889em;
    }

    .prose-2xl pre[data-prose=\\"true\\"] {
      font-size: 0.8333333em;
      line-height: 1.8;
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 0.5rem;
      padding-top: 1.2em;
      padding-right: 1.6em;
      padding-bottom: 1.2em;
      padding-left: 1.6em;
    }

    .prose-2xl ol[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl ul[data-prose=\\"true\\"] {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl li[data-prose=\\"true\\"] {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.6666667em;
    }

    .prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      left: 0;
    }

    .prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
      padding-left: 1.6666667em;
    }

    .prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
      width: 0.3333333em;
      height: 0.3333333em;
      top: calc(0.8333333em - 0.1666667em);
      left: 0.25em;
    }

    .prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
      margin-top: 0.8333333em;
      margin-bottom: 0.8333333em;
    }

    .prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-2xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-2xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .prose-2xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .prose-2xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
      margin-top: 0.6666667em;
      margin-bottom: 0.6666667em;
    }

    .prose-2xl hr[data-prose=\\"true\\"] {
      margin-top: 3em;
      margin-bottom: 3em;
    }

    .prose-2xl hr[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-2xl h2[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-2xl h3[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-2xl h4[data-prose=\\"true\\"] + * {
      margin-top: 0;
    }

    .prose-2xl table[data-prose=\\"true\\"] {
      font-size: 0.8333333em;
      line-height: 1.4;
    }

    .prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
      padding-right: 0.6em;
      padding-bottom: 0.8em;
      padding-left: 0.6em;
    }

    .prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
      padding-top: 0.8em;
      padding-right: 0.6em;
      padding-bottom: 0.8em;
      padding-left: 0.6em;
    }

    .prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
      padding-left: 0;
    }

    .prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
      padding-right: 0;
    }

    .prose-2xl > :first-child {
      margin-top: 0;
    }

    .prose-2xl > :last-child {
      margin-bottom: 0;
    }

    .prose-red a[data-prose=\\"true\\"] {
      color: #dc2626;
    }

    .prose-red a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #dc2626;
    }

    .prose-yellow a[data-prose=\\"true\\"] {
      color: #d97706;
    }

    .prose-yellow a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #d97706;
    }

    .prose-green a[data-prose=\\"true\\"] {
      color: #059669;
    }

    .prose-green a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #059669;
    }

    .prose-blue a[data-prose=\\"true\\"] {
      color: #2563eb;
    }

    .prose-blue a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #2563eb;
    }

    .prose-indigo a[data-prose=\\"true\\"] {
      color: #4f46e5;
    }

    .prose-indigo a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #4f46e5;
    }

    .prose-purple a[data-prose=\\"true\\"] {
      color: #7c3aed;
    }

    .prose-purple a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #7c3aed;
    }

    .prose-pink a[data-prose=\\"true\\"] {
      color: #db2777;
    }

    .prose-pink a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
      color: #db2777;
    }

    @media (min-width: 640px) {
      .sm\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .sm\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose a[data-prose=\\"true\\"] {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .sm\\\\:prose strong[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\"] {
        --list-counter-style: upper-alpha;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\"] {
        --list-counter-style: lower-alpha;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\" s] {
        --list-counter-style: upper-alpha;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\" s] {
        --list-counter-style: lower-alpha;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\"] {
        --list-counter-style: upper-roman;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\"] {
        --list-counter-style: lower-roman;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\" s] {
        --list-counter-style: upper-roman;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\" s] {
        --list-counter-style: lower-roman;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"][type=\\"1\\"] {
        --list-counter-style: decimal;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .sm\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .sm\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .sm\\\\:prose hr[data-prose=\\"true\\"] {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .sm\\\\:prose blockquote[data-prose=\\"true\\"] {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .sm\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:first-of-type::before {
        content: open-quote;
      }

      .sm\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:last-of-type::after {
        content: close-quote;
      }

      .sm\\\\:prose h1[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .sm\\\\:prose h1[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 900;
      }

      .sm\\\\:prose h2[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose h2[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 800;
      }

      .sm\\\\:prose h3[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .sm\\\\:prose h3[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .sm\\\\:prose h4[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .sm\\\\:prose h4[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .sm\\\\:prose figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .sm\\\\:prose code[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .sm\\\\:prose code[data-prose=\\"true\\"]::before {
        content: \\"\`\\";
      }

      .sm\\\\:prose code[data-prose=\\"true\\"]::after {
        content: \\"\`\\";
      }

      .sm\\\\:prose a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #111827;
      }

      .sm\\\\:prose pre[data-prose=\\"true\\"] {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .sm\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .sm\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::before {
        content: none;
      }

      .sm\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::after {
        content: none;
      }

      .sm\\\\:prose table[data-prose=\\"true\\"] {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .sm\\\\:prose thead[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .sm\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .sm\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"] {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .sm\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"]:last-child {
        border-bottom-width: 0;
      }

      .sm\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .sm\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .sm\\\\:prose p[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .sm\\\\:prose h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .sm\\\\:prose ol[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose ul[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .sm\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .sm\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .sm\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .sm\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .sm\\\\:prose ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .sm\\\\:prose hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .sm\\\\:prose-sm p[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-sm blockquote[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .sm\\\\:prose-sm h1[data-prose=\\"true\\"] {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .sm\\\\:prose-sm h2[data-prose=\\"true\\"] {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .sm\\\\:prose-sm h3[data-prose=\\"true\\"] {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-sm h4[data-prose=\\"true\\"] {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .sm\\\\:prose-sm img[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm video[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm figure[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-sm figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .sm\\\\:prose-sm code[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
      }

      .sm\\\\:prose-sm h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .sm\\\\:prose-sm h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-sm pre[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm ol[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm ul[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm li[data-prose=\\"true\\"] {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .sm\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .sm\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .sm\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .sm\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .sm\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .sm\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .sm\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .sm\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-sm ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .sm\\\\:prose-sm ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-sm ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .sm\\\\:prose-sm hr[data-prose=\\"true\\"] {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .sm\\\\:prose-sm hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm table[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .sm\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .sm\\\\:prose-lg p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .sm\\\\:prose-lg blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-lg h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .sm\\\\:prose-lg h2[data-prose=\\"true\\"] {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose-lg h3[data-prose=\\"true\\"] {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .sm\\\\:prose-lg h4[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-lg img[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg video[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg figure[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-lg figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .sm\\\\:prose-lg code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-lg h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8666667em;
      }

      .sm\\\\:prose-lg h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .sm\\\\:prose-lg pre[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .sm\\\\:prose-lg ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg li[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .sm\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .sm\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .sm\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-lg ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .sm\\\\:prose-lg ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-lg ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-lg hr[data-prose=\\"true\\"] {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .sm\\\\:prose-lg hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg table[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .sm\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .sm\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .sm\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .sm\\\\:prose-xl p[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .sm\\\\:prose-xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .sm\\\\:prose-xl h1[data-prose=\\"true\\"] {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .sm\\\\:prose-xl h2[data-prose=\\"true\\"] {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .sm\\\\:prose-xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose-xl h4[data-prose=\\"true\\"] {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .sm\\\\:prose-xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .sm\\\\:prose-xl code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .sm\\\\:prose-xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8611111em;
      }

      .sm\\\\:prose-xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .sm\\\\:prose-xl pre[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .sm\\\\:prose-xl ol[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl ul[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl li[data-prose=\\"true\\"] {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .sm\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .sm\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .sm\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .sm\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .sm\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .sm\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .sm\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .sm\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .sm\\\\:prose-xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .sm\\\\:prose-xl hr[data-prose=\\"true\\"] {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .sm\\\\:prose-xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl table[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .sm\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .sm\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .sm\\\\:prose-2xl p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .sm\\\\:prose-2xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .sm\\\\:prose-2xl h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .sm\\\\:prose-2xl h2[data-prose=\\"true\\"] {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .sm\\\\:prose-2xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .sm\\\\:prose-2xl h4[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .sm\\\\:prose-2xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-2xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .sm\\\\:prose-2xl code[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
      }

      .sm\\\\:prose-2xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .sm\\\\:prose-2xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-2xl pre[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .sm\\\\:prose-2xl ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .sm\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .sm\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .sm\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .sm\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-2xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .sm\\\\:prose-2xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .sm\\\\:prose-2xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .sm\\\\:prose-2xl hr[data-prose=\\"true\\"] {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .sm\\\\:prose-2xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl table[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .sm\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .sm\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .sm\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-red a[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .sm\\\\:prose-red a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .sm\\\\:prose-yellow a[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .sm\\\\:prose-yellow a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .sm\\\\:prose-green a[data-prose=\\"true\\"] {
        color: #059669;
      }

      .sm\\\\:prose-green a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #059669;
      }

      .sm\\\\:prose-blue a[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .sm\\\\:prose-blue a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .sm\\\\:prose-indigo a[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .sm\\\\:prose-indigo a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .sm\\\\:prose-purple a[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .sm\\\\:prose-purple a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .sm\\\\:prose-pink a[data-prose=\\"true\\"] {
        color: #db2777;
      }

      .sm\\\\:prose-pink a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #db2777;
      }
    }

    @media (min-width: 768px) {
      .md\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .md\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose a[data-prose=\\"true\\"] {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .md\\\\:prose strong[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\"] {
        --list-counter-style: upper-alpha;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\"] {
        --list-counter-style: lower-alpha;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\" s] {
        --list-counter-style: upper-alpha;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\" s] {
        --list-counter-style: lower-alpha;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\"] {
        --list-counter-style: upper-roman;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\"] {
        --list-counter-style: lower-roman;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\" s] {
        --list-counter-style: upper-roman;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\" s] {
        --list-counter-style: lower-roman;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"][type=\\"1\\"] {
        --list-counter-style: decimal;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .md\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .md\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .md\\\\:prose hr[data-prose=\\"true\\"] {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .md\\\\:prose blockquote[data-prose=\\"true\\"] {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .md\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:first-of-type::before {
        content: open-quote;
      }

      .md\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:last-of-type::after {
        content: close-quote;
      }

      .md\\\\:prose h1[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .md\\\\:prose h1[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 900;
      }

      .md\\\\:prose h2[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .md\\\\:prose h2[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 800;
      }

      .md\\\\:prose h3[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .md\\\\:prose h3[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .md\\\\:prose h4[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .md\\\\:prose h4[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .md\\\\:prose figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .md\\\\:prose code[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .md\\\\:prose code[data-prose=\\"true\\"]::before {
        content: \\"\`\\";
      }

      .md\\\\:prose code[data-prose=\\"true\\"]::after {
        content: \\"\`\\";
      }

      .md\\\\:prose a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #111827;
      }

      .md\\\\:prose pre[data-prose=\\"true\\"] {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .md\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .md\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::before {
        content: none;
      }

      .md\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::after {
        content: none;
      }

      .md\\\\:prose table[data-prose=\\"true\\"] {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .md\\\\:prose thead[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .md\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .md\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"] {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .md\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"]:last-child {
        border-bottom-width: 0;
      }

      .md\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .md\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .md\\\\:prose p[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .md\\\\:prose h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .md\\\\:prose ol[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose ul[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .md\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .md\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .md\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .md\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .md\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .md\\\\:prose ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .md\\\\:prose ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .md\\\\:prose hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .md\\\\:prose-sm p[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-sm blockquote[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .md\\\\:prose-sm h1[data-prose=\\"true\\"] {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .md\\\\:prose-sm h2[data-prose=\\"true\\"] {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .md\\\\:prose-sm h3[data-prose=\\"true\\"] {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-sm h4[data-prose=\\"true\\"] {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .md\\\\:prose-sm img[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm video[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm figure[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-sm figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .md\\\\:prose-sm code[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
      }

      .md\\\\:prose-sm h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .md\\\\:prose-sm h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-sm pre[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm ol[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm ul[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm li[data-prose=\\"true\\"] {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .md\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .md\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .md\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .md\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .md\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .md\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .md\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .md\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-sm ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .md\\\\:prose-sm ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-sm ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .md\\\\:prose-sm hr[data-prose=\\"true\\"] {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .md\\\\:prose-sm hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm table[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .md\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .md\\\\:prose-lg p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .md\\\\:prose-lg blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-lg h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .md\\\\:prose-lg h2[data-prose=\\"true\\"] {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .md\\\\:prose-lg h3[data-prose=\\"true\\"] {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .md\\\\:prose-lg h4[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-lg img[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg video[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg figure[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-lg figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .md\\\\:prose-lg code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-lg h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8666667em;
      }

      .md\\\\:prose-lg h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .md\\\\:prose-lg pre[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .md\\\\:prose-lg ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg li[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .md\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .md\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .md\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-lg ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .md\\\\:prose-lg ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-lg ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-lg hr[data-prose=\\"true\\"] {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .md\\\\:prose-lg hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg table[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .md\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .md\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .md\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .md\\\\:prose-xl p[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .md\\\\:prose-xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .md\\\\:prose-xl h1[data-prose=\\"true\\"] {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .md\\\\:prose-xl h2[data-prose=\\"true\\"] {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .md\\\\:prose-xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .md\\\\:prose-xl h4[data-prose=\\"true\\"] {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .md\\\\:prose-xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .md\\\\:prose-xl code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .md\\\\:prose-xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8611111em;
      }

      .md\\\\:prose-xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .md\\\\:prose-xl pre[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .md\\\\:prose-xl ol[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl ul[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl li[data-prose=\\"true\\"] {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .md\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .md\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .md\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .md\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .md\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .md\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .md\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .md\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .md\\\\:prose-xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .md\\\\:prose-xl hr[data-prose=\\"true\\"] {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .md\\\\:prose-xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl table[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .md\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .md\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .md\\\\:prose-2xl p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .md\\\\:prose-2xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .md\\\\:prose-2xl h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .md\\\\:prose-2xl h2[data-prose=\\"true\\"] {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .md\\\\:prose-2xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .md\\\\:prose-2xl h4[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .md\\\\:prose-2xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-2xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .md\\\\:prose-2xl code[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
      }

      .md\\\\:prose-2xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .md\\\\:prose-2xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-2xl pre[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .md\\\\:prose-2xl ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .md\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .md\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .md\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .md\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-2xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .md\\\\:prose-2xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .md\\\\:prose-2xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .md\\\\:prose-2xl hr[data-prose=\\"true\\"] {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .md\\\\:prose-2xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl table[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .md\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .md\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .md\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-red a[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .md\\\\:prose-red a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .md\\\\:prose-yellow a[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .md\\\\:prose-yellow a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .md\\\\:prose-green a[data-prose=\\"true\\"] {
        color: #059669;
      }

      .md\\\\:prose-green a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #059669;
      }

      .md\\\\:prose-blue a[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .md\\\\:prose-blue a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .md\\\\:prose-indigo a[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .md\\\\:prose-indigo a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .md\\\\:prose-purple a[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .md\\\\:prose-purple a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .md\\\\:prose-pink a[data-prose=\\"true\\"] {
        color: #db2777;
      }

      .md\\\\:prose-pink a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #db2777;
      }
    }

    @media (min-width: 1024px) {
      .lg\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .lg\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose a[data-prose=\\"true\\"] {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .lg\\\\:prose strong[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\"] {
        --list-counter-style: upper-alpha;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\"] {
        --list-counter-style: lower-alpha;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\" s] {
        --list-counter-style: upper-alpha;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\" s] {
        --list-counter-style: lower-alpha;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\"] {
        --list-counter-style: upper-roman;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\"] {
        --list-counter-style: lower-roman;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\" s] {
        --list-counter-style: upper-roman;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\" s] {
        --list-counter-style: lower-roman;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"][type=\\"1\\"] {
        --list-counter-style: decimal;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .lg\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .lg\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .lg\\\\:prose hr[data-prose=\\"true\\"] {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .lg\\\\:prose blockquote[data-prose=\\"true\\"] {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .lg\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:first-of-type::before {
        content: open-quote;
      }

      .lg\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:last-of-type::after {
        content: close-quote;
      }

      .lg\\\\:prose h1[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .lg\\\\:prose h1[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 900;
      }

      .lg\\\\:prose h2[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose h2[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 800;
      }

      .lg\\\\:prose h3[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .lg\\\\:prose h3[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .lg\\\\:prose h4[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .lg\\\\:prose h4[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .lg\\\\:prose figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .lg\\\\:prose code[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .lg\\\\:prose code[data-prose=\\"true\\"]::before {
        content: \\"\`\\";
      }

      .lg\\\\:prose code[data-prose=\\"true\\"]::after {
        content: \\"\`\\";
      }

      .lg\\\\:prose a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #111827;
      }

      .lg\\\\:prose pre[data-prose=\\"true\\"] {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .lg\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .lg\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::before {
        content: none;
      }

      .lg\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::after {
        content: none;
      }

      .lg\\\\:prose table[data-prose=\\"true\\"] {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .lg\\\\:prose thead[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .lg\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .lg\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"] {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .lg\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"]:last-child {
        border-bottom-width: 0;
      }

      .lg\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .lg\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .lg\\\\:prose p[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .lg\\\\:prose h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .lg\\\\:prose ol[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose ul[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .lg\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .lg\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .lg\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .lg\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .lg\\\\:prose ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .lg\\\\:prose hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .lg\\\\:prose-sm p[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-sm blockquote[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .lg\\\\:prose-sm h1[data-prose=\\"true\\"] {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .lg\\\\:prose-sm h2[data-prose=\\"true\\"] {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .lg\\\\:prose-sm h3[data-prose=\\"true\\"] {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-sm h4[data-prose=\\"true\\"] {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .lg\\\\:prose-sm img[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm video[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm figure[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-sm figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .lg\\\\:prose-sm code[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
      }

      .lg\\\\:prose-sm h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .lg\\\\:prose-sm h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-sm pre[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm ol[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm ul[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm li[data-prose=\\"true\\"] {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .lg\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .lg\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .lg\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .lg\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .lg\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .lg\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .lg\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .lg\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-sm ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .lg\\\\:prose-sm ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-sm ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .lg\\\\:prose-sm hr[data-prose=\\"true\\"] {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .lg\\\\:prose-sm hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm table[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .lg\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .lg\\\\:prose-lg p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .lg\\\\:prose-lg blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-lg h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .lg\\\\:prose-lg h2[data-prose=\\"true\\"] {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose-lg h3[data-prose=\\"true\\"] {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .lg\\\\:prose-lg h4[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-lg img[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg video[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg figure[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-lg figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .lg\\\\:prose-lg code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-lg h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8666667em;
      }

      .lg\\\\:prose-lg h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .lg\\\\:prose-lg pre[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .lg\\\\:prose-lg ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg li[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .lg\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .lg\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .lg\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-lg ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .lg\\\\:prose-lg ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-lg ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-lg hr[data-prose=\\"true\\"] {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .lg\\\\:prose-lg hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg table[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .lg\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .lg\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .lg\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .lg\\\\:prose-xl p[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .lg\\\\:prose-xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .lg\\\\:prose-xl h1[data-prose=\\"true\\"] {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .lg\\\\:prose-xl h2[data-prose=\\"true\\"] {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .lg\\\\:prose-xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose-xl h4[data-prose=\\"true\\"] {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .lg\\\\:prose-xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .lg\\\\:prose-xl code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .lg\\\\:prose-xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8611111em;
      }

      .lg\\\\:prose-xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .lg\\\\:prose-xl pre[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .lg\\\\:prose-xl ol[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl ul[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl li[data-prose=\\"true\\"] {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .lg\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .lg\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .lg\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .lg\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .lg\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .lg\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .lg\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .lg\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .lg\\\\:prose-xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .lg\\\\:prose-xl hr[data-prose=\\"true\\"] {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .lg\\\\:prose-xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl table[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .lg\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .lg\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .lg\\\\:prose-2xl p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .lg\\\\:prose-2xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .lg\\\\:prose-2xl h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .lg\\\\:prose-2xl h2[data-prose=\\"true\\"] {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .lg\\\\:prose-2xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .lg\\\\:prose-2xl h4[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .lg\\\\:prose-2xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-2xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .lg\\\\:prose-2xl code[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
      }

      .lg\\\\:prose-2xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .lg\\\\:prose-2xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-2xl pre[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .lg\\\\:prose-2xl ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .lg\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .lg\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .lg\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .lg\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-2xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .lg\\\\:prose-2xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .lg\\\\:prose-2xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .lg\\\\:prose-2xl hr[data-prose=\\"true\\"] {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .lg\\\\:prose-2xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl table[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .lg\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .lg\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .lg\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-red a[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .lg\\\\:prose-red a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .lg\\\\:prose-yellow a[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .lg\\\\:prose-yellow a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .lg\\\\:prose-green a[data-prose=\\"true\\"] {
        color: #059669;
      }

      .lg\\\\:prose-green a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #059669;
      }

      .lg\\\\:prose-blue a[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .lg\\\\:prose-blue a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .lg\\\\:prose-indigo a[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .lg\\\\:prose-indigo a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .lg\\\\:prose-purple a[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .lg\\\\:prose-purple a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .lg\\\\:prose-pink a[data-prose=\\"true\\"] {
        color: #db2777;
      }

      .lg\\\\:prose-pink a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #db2777;
      }
    }

    @media (min-width: 1280px) {
      .xl\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .xl\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose a[data-prose=\\"true\\"] {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .xl\\\\:prose strong[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\"] {
        --list-counter-style: upper-alpha;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\"] {
        --list-counter-style: lower-alpha;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\" s] {
        --list-counter-style: upper-alpha;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\" s] {
        --list-counter-style: lower-alpha;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\"] {
        --list-counter-style: upper-roman;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\"] {
        --list-counter-style: lower-roman;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\" s] {
        --list-counter-style: upper-roman;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\" s] {
        --list-counter-style: lower-roman;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"1\\"] {
        --list-counter-style: decimal;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .xl\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .xl\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .xl\\\\:prose hr[data-prose=\\"true\\"] {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .xl\\\\:prose blockquote[data-prose=\\"true\\"] {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .xl\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:first-of-type::before {
        content: open-quote;
      }

      .xl\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:last-of-type::after {
        content: close-quote;
      }

      .xl\\\\:prose h1[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .xl\\\\:prose h1[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 900;
      }

      .xl\\\\:prose h2[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose h2[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 800;
      }

      .xl\\\\:prose h3[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .xl\\\\:prose h3[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .xl\\\\:prose h4[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .xl\\\\:prose h4[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .xl\\\\:prose figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .xl\\\\:prose code[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .xl\\\\:prose code[data-prose=\\"true\\"]::before {
        content: \\"\`\\";
      }

      .xl\\\\:prose code[data-prose=\\"true\\"]::after {
        content: \\"\`\\";
      }

      .xl\\\\:prose a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #111827;
      }

      .xl\\\\:prose pre[data-prose=\\"true\\"] {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .xl\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .xl\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::before {
        content: none;
      }

      .xl\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::after {
        content: none;
      }

      .xl\\\\:prose table[data-prose=\\"true\\"] {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .xl\\\\:prose thead[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .xl\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .xl\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"] {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .xl\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"]:last-child {
        border-bottom-width: 0;
      }

      .xl\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .xl\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .xl\\\\:prose p[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .xl\\\\:prose h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .xl\\\\:prose ol[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose ul[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .xl\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .xl\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .xl\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .xl\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .xl\\\\:prose ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .xl\\\\:prose hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .xl\\\\:prose-sm p[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-sm blockquote[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .xl\\\\:prose-sm h1[data-prose=\\"true\\"] {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .xl\\\\:prose-sm h2[data-prose=\\"true\\"] {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .xl\\\\:prose-sm h3[data-prose=\\"true\\"] {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-sm h4[data-prose=\\"true\\"] {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .xl\\\\:prose-sm img[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm video[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm figure[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-sm figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .xl\\\\:prose-sm code[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
      }

      .xl\\\\:prose-sm h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .xl\\\\:prose-sm h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-sm pre[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm ol[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm ul[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm li[data-prose=\\"true\\"] {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .xl\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .xl\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .xl\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .xl\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .xl\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .xl\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .xl\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .xl\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-sm ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .xl\\\\:prose-sm ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-sm ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .xl\\\\:prose-sm hr[data-prose=\\"true\\"] {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .xl\\\\:prose-sm hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm table[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .xl\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .xl\\\\:prose-lg p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .xl\\\\:prose-lg blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-lg h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .xl\\\\:prose-lg h2[data-prose=\\"true\\"] {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose-lg h3[data-prose=\\"true\\"] {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .xl\\\\:prose-lg h4[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-lg img[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg video[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg figure[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-lg figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .xl\\\\:prose-lg code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-lg h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8666667em;
      }

      .xl\\\\:prose-lg h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .xl\\\\:prose-lg pre[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .xl\\\\:prose-lg ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg li[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .xl\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .xl\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .xl\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-lg ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .xl\\\\:prose-lg ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-lg ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-lg hr[data-prose=\\"true\\"] {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .xl\\\\:prose-lg hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg table[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .xl\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .xl\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .xl\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .xl\\\\:prose-xl p[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .xl\\\\:prose-xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .xl\\\\:prose-xl h1[data-prose=\\"true\\"] {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .xl\\\\:prose-xl h2[data-prose=\\"true\\"] {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .xl\\\\:prose-xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose-xl h4[data-prose=\\"true\\"] {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .xl\\\\:prose-xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .xl\\\\:prose-xl code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .xl\\\\:prose-xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8611111em;
      }

      .xl\\\\:prose-xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .xl\\\\:prose-xl pre[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .xl\\\\:prose-xl ol[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl ul[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl li[data-prose=\\"true\\"] {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .xl\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .xl\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .xl\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .xl\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .xl\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .xl\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .xl\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .xl\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .xl\\\\:prose-xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .xl\\\\:prose-xl hr[data-prose=\\"true\\"] {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .xl\\\\:prose-xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl table[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .xl\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .xl\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .xl\\\\:prose-2xl p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .xl\\\\:prose-2xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .xl\\\\:prose-2xl h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .xl\\\\:prose-2xl h2[data-prose=\\"true\\"] {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .xl\\\\:prose-2xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .xl\\\\:prose-2xl h4[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .xl\\\\:prose-2xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-2xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .xl\\\\:prose-2xl code[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
      }

      .xl\\\\:prose-2xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .xl\\\\:prose-2xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-2xl pre[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .xl\\\\:prose-2xl ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .xl\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .xl\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .xl\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .xl\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-2xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .xl\\\\:prose-2xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .xl\\\\:prose-2xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .xl\\\\:prose-2xl hr[data-prose=\\"true\\"] {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .xl\\\\:prose-2xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl table[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .xl\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .xl\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .xl\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-red a[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .xl\\\\:prose-red a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .xl\\\\:prose-yellow a[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .xl\\\\:prose-yellow a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .xl\\\\:prose-green a[data-prose=\\"true\\"] {
        color: #059669;
      }

      .xl\\\\:prose-green a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #059669;
      }

      .xl\\\\:prose-blue a[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .xl\\\\:prose-blue a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .xl\\\\:prose-indigo a[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .xl\\\\:prose-indigo a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .xl\\\\:prose-purple a[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .xl\\\\:prose-purple a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .xl\\\\:prose-pink a[data-prose=\\"true\\"] {
        color: #db2777;
      }

      .xl\\\\:prose-pink a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #db2777;
      }
    }

    @media (min-width: 1536px) {
      .\\\\32xl\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .\\\\32xl\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose a[data-prose=\\"true\\"] {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .\\\\32xl\\\\:prose strong[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\"] {
        --list-counter-style: upper-alpha;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\"] {
        --list-counter-style: lower-alpha;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"A\\" s] {
        --list-counter-style: upper-alpha;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"a\\" s] {
        --list-counter-style: lower-alpha;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\"] {
        --list-counter-style: upper-roman;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\"] {
        --list-counter-style: lower-roman;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"I\\" s] {
        --list-counter-style: upper-roman;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"i\\" s] {
        --list-counter-style: lower-roman;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"][type=\\"1\\"] {
        --list-counter-style: decimal;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .\\\\32xl\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        position: relative;
        padding-left: 1.75em;
      }

      .\\\\32xl\\\\:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose hr[data-prose=\\"true\\"] {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .\\\\32xl\\\\:prose blockquote[data-prose=\\"true\\"] {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:first-of-type::before {
        content: open-quote;
      }

      .\\\\32xl\\\\:prose blockquote[data-prose=\\"true\\"] p[data-prose=\\"true\\"]:last-of-type::after {
        content: close-quote;
      }

      .\\\\32xl\\\\:prose h1[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .\\\\32xl\\\\:prose h1[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 900;
      }

      .\\\\32xl\\\\:prose h2[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose h2[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 800;
      }

      .\\\\32xl\\\\:prose h3[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .\\\\32xl\\\\:prose h3[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .\\\\32xl\\\\:prose h4[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose h4[data-prose=\\"true\\"] strong[data-prose=\\"true\\"] {
        font-weight: 700;
      }

      .\\\\32xl\\\\:prose figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .\\\\32xl\\\\:prose code[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose code[data-prose=\\"true\\"]::before {
        content: \\"\`\\";
      }

      .\\\\32xl\\\\:prose code[data-prose=\\"true\\"]::after {
        content: \\"\`\\";
      }

      .\\\\32xl\\\\:prose a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #111827;
      }

      .\\\\32xl\\\\:prose pre[data-prose=\\"true\\"] {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .\\\\32xl\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .\\\\32xl\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::before {
        content: none;
      }

      .\\\\32xl\\\\:prose pre[data-prose=\\"true\\"] code[data-prose=\\"true\\"]::after {
        content: none;
      }

      .\\\\32xl\\\\:prose table[data-prose=\\"true\\"] {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .\\\\32xl\\\\:prose thead[data-prose=\\"true\\"] {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .\\\\32xl\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .\\\\32xl\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"] {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .\\\\32xl\\\\:prose tbody[data-prose=\\"true\\"] tr[data-prose=\\"true\\"]:last-child {
        border-bottom-width: 0;
      }

      .\\\\32xl\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .\\\\32xl\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .\\\\32xl\\\\:prose p[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose ul[data-prose=\\"true\\"] {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .\\\\32xl\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .\\\\32xl\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .\\\\32xl\\\\:prose > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.25em;
      }

      .\\\\32xl\\\\:prose > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .\\\\32xl\\\\:prose hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .\\\\32xl\\\\:prose-sm p[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-sm blockquote[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .\\\\32xl\\\\:prose-sm h1[data-prose=\\"true\\"] {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .\\\\32xl\\\\:prose-sm h2[data-prose=\\"true\\"] {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .\\\\32xl\\\\:prose-sm h3[data-prose=\\"true\\"] {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-sm h4[data-prose=\\"true\\"] {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .\\\\32xl\\\\:prose-sm img[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm video[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm figure[data-prose=\\"true\\"] {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-sm figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-sm code[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
      }

      .\\\\32xl\\\\:prose-sm h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-sm h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-sm pre[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm ol[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm ul[data-prose=\\"true\\"] {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm li[data-prose=\\"true\\"] {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .\\\\32xl\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .\\\\32xl\\\\:prose-sm ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.5714286em;
      }

      .\\\\32xl\\\\:prose-sm ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .\\\\32xl\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .\\\\32xl\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-sm ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-sm ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-sm ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .\\\\32xl\\\\:prose-sm hr[data-prose=\\"true\\"] {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .\\\\32xl\\\\:prose-sm hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm table[data-prose=\\"true\\"] {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-sm thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-sm tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .\\\\32xl\\\\:prose-lg p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .\\\\32xl\\\\:prose-lg blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-lg h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-lg h2[data-prose=\\"true\\"] {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose-lg h3[data-prose=\\"true\\"] {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-lg h4[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-lg img[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg video[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg figure[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-lg figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-lg code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8666667em;
      }

      .\\\\32xl\\\\:prose-lg h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose-lg pre[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .\\\\32xl\\\\:prose-lg ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg li[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-lg ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-lg ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .\\\\32xl\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-lg ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-lg ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-lg ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg hr[data-prose=\\"true\\"] {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .\\\\32xl\\\\:prose-lg hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg table[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .\\\\32xl\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-lg thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .\\\\32xl\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-lg tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .\\\\32xl\\\\:prose-xl p[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .\\\\32xl\\\\:prose-xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .\\\\32xl\\\\:prose-xl h1[data-prose=\\"true\\"] {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-xl h2[data-prose=\\"true\\"] {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .\\\\32xl\\\\:prose-xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose-xl h4[data-prose=\\"true\\"] {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .\\\\32xl\\\\:prose-xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-xl code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8611111em;
      }

      .\\\\32xl\\\\:prose-xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-xl pre[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-xl ol[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl ul[data-prose=\\"true\\"] {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl li[data-prose=\\"true\\"] {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .\\\\32xl\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .\\\\32xl\\\\:prose-xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.8em;
      }

      .\\\\32xl\\\\:prose-xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .\\\\32xl\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .\\\\32xl\\\\:prose-xl hr[data-prose=\\"true\\"] {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .\\\\32xl\\\\:prose-xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl table[data-prose=\\"true\\"] {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .\\\\32xl\\\\:prose-2xl p[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .\\\\32xl\\\\:prose-2xl blockquote[data-prose=\\"true\\"] {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .\\\\32xl\\\\:prose-2xl h1[data-prose=\\"true\\"] {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-2xl h2[data-prose=\\"true\\"] {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .\\\\32xl\\\\:prose-2xl h3[data-prose=\\"true\\"] {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .\\\\32xl\\\\:prose-2xl h4[data-prose=\\"true\\"] {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-2xl img[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl video[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl figure[data-prose=\\"true\\"] {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl figure[data-prose=\\"true\\"] > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-2xl figure[data-prose=\\"true\\"] figcaption[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-2xl code[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
      }

      .\\\\32xl\\\\:prose-2xl h2[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose-2xl h3[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-2xl pre[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .\\\\32xl\\\\:prose-2xl ol[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl ul[data-prose=\\"true\\"] {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl li[data-prose=\\"true\\"] {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .\\\\32xl\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] p[data-prose=\\"true\\"] {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ol[data-prose=\\"true\\"] > li[data-prose=\\"true\\"] > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl ul[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-2xl ul[data-prose=\\"true\\"] ol[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-2xl ol[data-prose=\\"true\\"] ul[data-prose=\\"true\\"], .\\\\32xl\\\\:prose-2xl ol[data-prose=\\"true\\"] ol[data-prose=\\"true\\"] {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl hr[data-prose=\\"true\\"] {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .\\\\32xl\\\\:prose-2xl hr[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl h2[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl h3[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl h4[data-prose=\\"true\\"] + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl table[data-prose=\\"true\\"] {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .\\\\32xl\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"] {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .\\\\32xl\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-2xl thead[data-prose=\\"true\\"] th[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"] {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .\\\\32xl\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-2xl tbody[data-prose=\\"true\\"] td[data-prose=\\"true\\"]:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-red a[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .\\\\32xl\\\\:prose-red a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #dc2626;
      }

      .\\\\32xl\\\\:prose-yellow a[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .\\\\32xl\\\\:prose-yellow a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #d97706;
      }

      .\\\\32xl\\\\:prose-green a[data-prose=\\"true\\"] {
        color: #059669;
      }

      .\\\\32xl\\\\:prose-green a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #059669;
      }

      .\\\\32xl\\\\:prose-blue a[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .\\\\32xl\\\\:prose-blue a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #2563eb;
      }

      .\\\\32xl\\\\:prose-indigo a[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .\\\\32xl\\\\:prose-indigo a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #4f46e5;
      }

      .\\\\32xl\\\\:prose-purple a[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .\\\\32xl\\\\:prose-purple a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #7c3aed;
      }

      .\\\\32xl\\\\:prose-pink a[data-prose=\\"true\\"] {
        color: #db2777;
      }

      .\\\\32xl\\\\:prose-pink a[data-prose=\\"true\\"] code[data-prose=\\"true\\"] {
        color: #db2777;
      }
    }"
  `)
})

it('should be possible to change the default className from `prose` to `markdown`', async () => {
  expect(await diffOnly({ className: 'markdown' })).toMatchInlineSnapshot(`
    "

      - .prose {
      + .markdown {

      ---

      - .prose [class~='lead'] {
      + .markdown [class~='lead'] {

      ---

      - .prose a[data-prose='true'] {
      + .markdown a[data-prose='true'] {

      ---

      - .prose strong[data-prose='true'] {
      + .markdown strong[data-prose='true'] {

      ---

      - .prose ol[data-prose='true'][type='A'] {
      + .markdown ol[data-prose='true'][type='A'] {

      ---

      - .prose ol[data-prose='true'][type='a'] {
      + .markdown ol[data-prose='true'][type='a'] {

      ---

      - .prose ol[data-prose='true'][type='A' s] {
      + .markdown ol[data-prose='true'][type='A' s] {

      ---

      - .prose ol[data-prose='true'][type='a' s] {
      + .markdown ol[data-prose='true'][type='a' s] {

      ---

      - .prose ol[data-prose='true'][type='I'] {
      + .markdown ol[data-prose='true'][type='I'] {

      ---

      - .prose ol[data-prose='true'][type='i'] {
      + .markdown ol[data-prose='true'][type='i'] {

      ---

      - .prose ol[data-prose='true'][type='I' s] {
      + .markdown ol[data-prose='true'][type='I' s] {

      ---

      - .prose ol[data-prose='true'][type='i' s] {
      + .markdown ol[data-prose='true'][type='i' s] {

      ---

      - .prose ol[data-prose='true'][type='1'] {
      + .markdown ol[data-prose='true'][type='1'] {

      ---

      - .prose ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose hr[data-prose='true'] {
      + .markdown hr[data-prose='true'] {

      ---

      - .prose blockquote[data-prose='true'] {
      + .markdown blockquote[data-prose='true'] {

      ---

      - .prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      + .markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      - .prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      + .markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      - .prose h1[data-prose='true'] {
      + .markdown h1[data-prose='true'] {

      ---

      - .prose h1[data-prose='true'] strong[data-prose='true'] {
      + .markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose h2[data-prose='true'] {
      + .markdown h2[data-prose='true'] {

      ---

      - .prose h2[data-prose='true'] strong[data-prose='true'] {
      + .markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose h3[data-prose='true'] {
      + .markdown h3[data-prose='true'] {

      ---

      - .prose h3[data-prose='true'] strong[data-prose='true'] {
      + .markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose h4[data-prose='true'] {
      + .markdown h4[data-prose='true'] {

      ---

      - .prose h4[data-prose='true'] strong[data-prose='true'] {
      + .markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose code[data-prose='true'] {
      + .markdown code[data-prose='true'] {

      ---

      - .prose code[data-prose='true']::before {
      + .markdown code[data-prose='true']::before {

      ---

      - .prose code[data-prose='true']::after {
      + .markdown code[data-prose='true']::after {

      ---

      - .prose a[data-prose='true'] code[data-prose='true'] {
      + .markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose pre[data-prose='true'] {
      + .markdown pre[data-prose='true'] {

      ---

      - .prose pre[data-prose='true'] code[data-prose='true'] {
      + .markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose pre[data-prose='true'] code[data-prose='true']::before {
      + .markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      - .prose pre[data-prose='true'] code[data-prose='true']::after {
      + .markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      - .prose table[data-prose='true'] {
      + .markdown table[data-prose='true'] {

      ---

      - .prose thead[data-prose='true'] {
      + .markdown thead[data-prose='true'] {

      ---

      - .prose thead[data-prose='true'] th[data-prose='true'] {
      + .markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose tbody[data-prose='true'] tr[data-prose='true'] {
      + .markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      - .prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      + .markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      - .prose tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose {
      + .markdown {

      ---

      - .prose p[data-prose='true'] {
      + .markdown p[data-prose='true'] {

      ---

      - .prose img[data-prose='true'] {
      + .markdown img[data-prose='true'] {

      ---

      - .prose video[data-prose='true'] {
      + .markdown video[data-prose='true'] {

      ---

      - .prose figure[data-prose='true'] {
      + .markdown figure[data-prose='true'] {

      ---

      - .prose figure[data-prose='true'] > * {
      + .markdown figure[data-prose='true'] > * {

      ---

      - .prose h2[data-prose='true'] code[data-prose='true'] {
      + .markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose h3[data-prose='true'] code[data-prose='true'] {
      + .markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose ol[data-prose='true'] {
      + .markdown ol[data-prose='true'] {

      ---

      - .prose ul[data-prose='true'] {
      + .markdown ul[data-prose='true'] {

      ---

      - .prose li[data-prose='true'] {
      + .markdown li[data-prose='true'] {

      ---

      - .prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose ul[data-prose='true'] ul[data-prose='true'], .prose ul[data-prose='true'] ol[data-prose='true'], .prose ol[data-prose='true'] ul[data-prose='true'], .prose ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown ul[data-prose='true'] ul[data-prose='true'], .markdown ul[data-prose='true'] ol[data-prose='true'], .markdown ol[data-prose='true'] ul[data-prose='true'], .markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose hr[data-prose='true'] + * {
      + .markdown hr[data-prose='true'] + * {

      ---

      - .prose h2[data-prose='true'] + * {
      + .markdown h2[data-prose='true'] + * {

      ---

      - .prose h3[data-prose='true'] + * {
      + .markdown h3[data-prose='true'] + * {

      ---

      - .prose h4[data-prose='true'] + * {
      + .markdown h4[data-prose='true'] + * {

      ---

      - .prose thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose > :first-child {
      + .markdown > :first-child {

      ---

      - .prose > :last-child {
      + .markdown > :last-child {

      ---

      - .prose-sm {
      + .markdown-sm {

      ---

      - .prose-sm p[data-prose='true'] {
      + .markdown-sm p[data-prose='true'] {

      ---

      - .prose-sm [class~='lead'] {
      + .markdown-sm [class~='lead'] {

      ---

      - .prose-sm blockquote[data-prose='true'] {
      + .markdown-sm blockquote[data-prose='true'] {

      ---

      - .prose-sm h1[data-prose='true'] {
      + .markdown-sm h1[data-prose='true'] {

      ---

      - .prose-sm h2[data-prose='true'] {
      + .markdown-sm h2[data-prose='true'] {

      ---

      - .prose-sm h3[data-prose='true'] {
      + .markdown-sm h3[data-prose='true'] {

      ---

      - .prose-sm h4[data-prose='true'] {
      + .markdown-sm h4[data-prose='true'] {

      ---

      - .prose-sm img[data-prose='true'] {
      + .markdown-sm img[data-prose='true'] {

      ---

      - .prose-sm video[data-prose='true'] {
      + .markdown-sm video[data-prose='true'] {

      ---

      - .prose-sm figure[data-prose='true'] {
      + .markdown-sm figure[data-prose='true'] {

      ---

      - .prose-sm figure[data-prose='true'] > * {
      + .markdown-sm figure[data-prose='true'] > * {

      ---

      - .prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-sm figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-sm code[data-prose='true'] {
      + .markdown-sm code[data-prose='true'] {

      ---

      - .prose-sm h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-sm h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-sm h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-sm h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-sm pre[data-prose='true'] {
      + .markdown-sm pre[data-prose='true'] {

      ---

      - .prose-sm ol[data-prose='true'] {
      + .markdown-sm ol[data-prose='true'] {

      ---

      - .prose-sm ul[data-prose='true'] {
      + .markdown-sm ul[data-prose='true'] {

      ---

      - .prose-sm li[data-prose='true'] {
      + .markdown-sm li[data-prose='true'] {

      ---

      - .prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-sm ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-sm ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-sm ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-sm ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-sm ul[data-prose='true'] ul[data-prose='true'], .prose-sm ul[data-prose='true'] ol[data-prose='true'], .prose-sm ol[data-prose='true'] ul[data-prose='true'], .prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-sm ul[data-prose='true'] ul[data-prose='true'], .markdown-sm ul[data-prose='true'] ol[data-prose='true'], .markdown-sm ol[data-prose='true'] ul[data-prose='true'], .markdown-sm ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-sm hr[data-prose='true'] {
      + .markdown-sm hr[data-prose='true'] {

      ---

      - .prose-sm hr[data-prose='true'] + * {
      + .markdown-sm hr[data-prose='true'] + * {

      ---

      - .prose-sm h2[data-prose='true'] + * {
      + .markdown-sm h2[data-prose='true'] + * {

      ---

      - .prose-sm h3[data-prose='true'] + * {
      + .markdown-sm h3[data-prose='true'] + * {

      ---

      - .prose-sm h4[data-prose='true'] + * {
      + .markdown-sm h4[data-prose='true'] + * {

      ---

      - .prose-sm table[data-prose='true'] {
      + .markdown-sm table[data-prose='true'] {

      ---

      - .prose-sm thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-sm thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-sm thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-sm thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-sm tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-sm tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-sm tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-sm > :first-child {
      + .markdown-sm > :first-child {

      ---

      - .prose-sm > :last-child {
      + .markdown-sm > :last-child {

      ---

      - .prose-lg {
      + .markdown-lg {

      ---

      - .prose-lg p[data-prose='true'] {
      + .markdown-lg p[data-prose='true'] {

      ---

      - .prose-lg [class~='lead'] {
      + .markdown-lg [class~='lead'] {

      ---

      - .prose-lg blockquote[data-prose='true'] {
      + .markdown-lg blockquote[data-prose='true'] {

      ---

      - .prose-lg h1[data-prose='true'] {
      + .markdown-lg h1[data-prose='true'] {

      ---

      - .prose-lg h2[data-prose='true'] {
      + .markdown-lg h2[data-prose='true'] {

      ---

      - .prose-lg h3[data-prose='true'] {
      + .markdown-lg h3[data-prose='true'] {

      ---

      - .prose-lg h4[data-prose='true'] {
      + .markdown-lg h4[data-prose='true'] {

      ---

      - .prose-lg img[data-prose='true'] {
      + .markdown-lg img[data-prose='true'] {

      ---

      - .prose-lg video[data-prose='true'] {
      + .markdown-lg video[data-prose='true'] {

      ---

      - .prose-lg figure[data-prose='true'] {
      + .markdown-lg figure[data-prose='true'] {

      ---

      - .prose-lg figure[data-prose='true'] > * {
      + .markdown-lg figure[data-prose='true'] > * {

      ---

      - .prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-lg code[data-prose='true'] {
      + .markdown-lg code[data-prose='true'] {

      ---

      - .prose-lg h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-lg h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-lg pre[data-prose='true'] {
      + .markdown-lg pre[data-prose='true'] {

      ---

      - .prose-lg ol[data-prose='true'] {
      + .markdown-lg ol[data-prose='true'] {

      ---

      - .prose-lg ul[data-prose='true'] {
      + .markdown-lg ul[data-prose='true'] {

      ---

      - .prose-lg li[data-prose='true'] {
      + .markdown-lg li[data-prose='true'] {

      ---

      - .prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-lg ul[data-prose='true'] ul[data-prose='true'], .prose-lg ul[data-prose='true'] ol[data-prose='true'], .prose-lg ol[data-prose='true'] ul[data-prose='true'], .prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-lg ul[data-prose='true'] ul[data-prose='true'], .markdown-lg ul[data-prose='true'] ol[data-prose='true'], .markdown-lg ol[data-prose='true'] ul[data-prose='true'], .markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-lg hr[data-prose='true'] {
      + .markdown-lg hr[data-prose='true'] {

      ---

      - .prose-lg hr[data-prose='true'] + * {
      + .markdown-lg hr[data-prose='true'] + * {

      ---

      - .prose-lg h2[data-prose='true'] + * {
      + .markdown-lg h2[data-prose='true'] + * {

      ---

      - .prose-lg h3[data-prose='true'] + * {
      + .markdown-lg h3[data-prose='true'] + * {

      ---

      - .prose-lg h4[data-prose='true'] + * {
      + .markdown-lg h4[data-prose='true'] + * {

      ---

      - .prose-lg table[data-prose='true'] {
      + .markdown-lg table[data-prose='true'] {

      ---

      - .prose-lg thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-lg > :first-child {
      + .markdown-lg > :first-child {

      ---

      - .prose-lg > :last-child {
      + .markdown-lg > :last-child {

      ---

      - .prose-xl {
      + .markdown-xl {

      ---

      - .prose-xl p[data-prose='true'] {
      + .markdown-xl p[data-prose='true'] {

      ---

      - .prose-xl [class~='lead'] {
      + .markdown-xl [class~='lead'] {

      ---

      - .prose-xl blockquote[data-prose='true'] {
      + .markdown-xl blockquote[data-prose='true'] {

      ---

      - .prose-xl h1[data-prose='true'] {
      + .markdown-xl h1[data-prose='true'] {

      ---

      - .prose-xl h2[data-prose='true'] {
      + .markdown-xl h2[data-prose='true'] {

      ---

      - .prose-xl h3[data-prose='true'] {
      + .markdown-xl h3[data-prose='true'] {

      ---

      - .prose-xl h4[data-prose='true'] {
      + .markdown-xl h4[data-prose='true'] {

      ---

      - .prose-xl img[data-prose='true'] {
      + .markdown-xl img[data-prose='true'] {

      ---

      - .prose-xl video[data-prose='true'] {
      + .markdown-xl video[data-prose='true'] {

      ---

      - .prose-xl figure[data-prose='true'] {
      + .markdown-xl figure[data-prose='true'] {

      ---

      - .prose-xl figure[data-prose='true'] > * {
      + .markdown-xl figure[data-prose='true'] > * {

      ---

      - .prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-xl code[data-prose='true'] {
      + .markdown-xl code[data-prose='true'] {

      ---

      - .prose-xl h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-xl h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-xl pre[data-prose='true'] {
      + .markdown-xl pre[data-prose='true'] {

      ---

      - .prose-xl ol[data-prose='true'] {
      + .markdown-xl ol[data-prose='true'] {

      ---

      - .prose-xl ul[data-prose='true'] {
      + .markdown-xl ul[data-prose='true'] {

      ---

      - .prose-xl li[data-prose='true'] {
      + .markdown-xl li[data-prose='true'] {

      ---

      - .prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-xl ul[data-prose='true'] ul[data-prose='true'], .prose-xl ul[data-prose='true'] ol[data-prose='true'], .prose-xl ol[data-prose='true'] ul[data-prose='true'], .prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-xl ul[data-prose='true'] ul[data-prose='true'], .markdown-xl ul[data-prose='true'] ol[data-prose='true'], .markdown-xl ol[data-prose='true'] ul[data-prose='true'], .markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-xl hr[data-prose='true'] {
      + .markdown-xl hr[data-prose='true'] {

      ---

      - .prose-xl hr[data-prose='true'] + * {
      + .markdown-xl hr[data-prose='true'] + * {

      ---

      - .prose-xl h2[data-prose='true'] + * {
      + .markdown-xl h2[data-prose='true'] + * {

      ---

      - .prose-xl h3[data-prose='true'] + * {
      + .markdown-xl h3[data-prose='true'] + * {

      ---

      - .prose-xl h4[data-prose='true'] + * {
      + .markdown-xl h4[data-prose='true'] + * {

      ---

      - .prose-xl table[data-prose='true'] {
      + .markdown-xl table[data-prose='true'] {

      ---

      - .prose-xl thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-xl > :first-child {
      + .markdown-xl > :first-child {

      ---

      - .prose-xl > :last-child {
      + .markdown-xl > :last-child {

      ---

      - .prose-2xl {
      + .markdown-2xl {

      ---

      - .prose-2xl p[data-prose='true'] {
      + .markdown-2xl p[data-prose='true'] {

      ---

      - .prose-2xl [class~='lead'] {
      + .markdown-2xl [class~='lead'] {

      ---

      - .prose-2xl blockquote[data-prose='true'] {
      + .markdown-2xl blockquote[data-prose='true'] {

      ---

      - .prose-2xl h1[data-prose='true'] {
      + .markdown-2xl h1[data-prose='true'] {

      ---

      - .prose-2xl h2[data-prose='true'] {
      + .markdown-2xl h2[data-prose='true'] {

      ---

      - .prose-2xl h3[data-prose='true'] {
      + .markdown-2xl h3[data-prose='true'] {

      ---

      - .prose-2xl h4[data-prose='true'] {
      + .markdown-2xl h4[data-prose='true'] {

      ---

      - .prose-2xl img[data-prose='true'] {
      + .markdown-2xl img[data-prose='true'] {

      ---

      - .prose-2xl video[data-prose='true'] {
      + .markdown-2xl video[data-prose='true'] {

      ---

      - .prose-2xl figure[data-prose='true'] {
      + .markdown-2xl figure[data-prose='true'] {

      ---

      - .prose-2xl figure[data-prose='true'] > * {
      + .markdown-2xl figure[data-prose='true'] > * {

      ---

      - .prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-2xl code[data-prose='true'] {
      + .markdown-2xl code[data-prose='true'] {

      ---

      - .prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-2xl pre[data-prose='true'] {
      + .markdown-2xl pre[data-prose='true'] {

      ---

      - .prose-2xl ol[data-prose='true'] {
      + .markdown-2xl ol[data-prose='true'] {

      ---

      - .prose-2xl ul[data-prose='true'] {
      + .markdown-2xl ul[data-prose='true'] {

      ---

      - .prose-2xl li[data-prose='true'] {
      + .markdown-2xl li[data-prose='true'] {

      ---

      - .prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-2xl ul[data-prose='true'] ul[data-prose='true'], .prose-2xl ul[data-prose='true'] ol[data-prose='true'], .prose-2xl ol[data-prose='true'] ul[data-prose='true'], .prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-2xl hr[data-prose='true'] {
      + .markdown-2xl hr[data-prose='true'] {

      ---

      - .prose-2xl hr[data-prose='true'] + * {
      + .markdown-2xl hr[data-prose='true'] + * {

      ---

      - .prose-2xl h2[data-prose='true'] + * {
      + .markdown-2xl h2[data-prose='true'] + * {

      ---

      - .prose-2xl h3[data-prose='true'] + * {
      + .markdown-2xl h3[data-prose='true'] + * {

      ---

      - .prose-2xl h4[data-prose='true'] + * {
      + .markdown-2xl h4[data-prose='true'] + * {

      ---

      - .prose-2xl table[data-prose='true'] {
      + .markdown-2xl table[data-prose='true'] {

      ---

      - .prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-2xl > :first-child {
      + .markdown-2xl > :first-child {

      ---

      - .prose-2xl > :last-child {
      + .markdown-2xl > :last-child {

      ---

      - .prose-red a[data-prose='true'] {
      + .markdown-red a[data-prose='true'] {

      ---

      - .prose-red a[data-prose='true'] code[data-prose='true'] {
      + .markdown-red a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-yellow a[data-prose='true'] {
      + .markdown-yellow a[data-prose='true'] {

      ---

      - .prose-yellow a[data-prose='true'] code[data-prose='true'] {
      + .markdown-yellow a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-green a[data-prose='true'] {
      + .markdown-green a[data-prose='true'] {

      ---

      - .prose-green a[data-prose='true'] code[data-prose='true'] {
      + .markdown-green a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-blue a[data-prose='true'] {
      + .markdown-blue a[data-prose='true'] {

      ---

      - .prose-blue a[data-prose='true'] code[data-prose='true'] {
      + .markdown-blue a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-indigo a[data-prose='true'] {
      + .markdown-indigo a[data-prose='true'] {

      ---

      - .prose-indigo a[data-prose='true'] code[data-prose='true'] {
      + .markdown-indigo a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-purple a[data-prose='true'] {
      + .markdown-purple a[data-prose='true'] {

      ---

      - .prose-purple a[data-prose='true'] code[data-prose='true'] {
      + .markdown-purple a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-pink a[data-prose='true'] {
      + .markdown-pink a[data-prose='true'] {

      ---

      - .prose-pink a[data-prose='true'] code[data-prose='true'] {
      + .markdown-pink a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose [class~='lead'] {
      +   .sm\\\\:markdown [class~='lead'] {

      ---

      -   .sm\\\\:prose a[data-prose='true'] {
      +   .sm\\\\:markdown a[data-prose='true'] {

      ---

      -   .sm\\\\:prose strong[data-prose='true'] {
      +   .sm\\\\:markdown strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='A'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='a'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='I'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='i'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='1'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose hr[data-prose='true'] {
      +   .sm\\\\:markdown hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose blockquote[data-prose='true'] {
      +   .sm\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .sm\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .sm\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .sm\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .sm\\\\:prose h1[data-prose='true'] {
      +   .sm\\\\:markdown h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] {
      +   .sm\\\\:markdown h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] {
      +   .sm\\\\:markdown h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose h4[data-prose='true'] {
      +   .sm\\\\:markdown h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose code[data-prose='true'] {
      +   .sm\\\\:markdown code[data-prose='true'] {

      ---

      -   .sm\\\\:prose code[data-prose='true']::before {
      +   .sm\\\\:markdown code[data-prose='true']::before {

      ---

      -   .sm\\\\:prose code[data-prose='true']::after {
      +   .sm\\\\:markdown code[data-prose='true']::after {

      ---

      -   .sm\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] {
      +   .sm\\\\:markdown pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .sm\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .sm\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .sm\\\\:prose table[data-prose='true'] {
      +   .sm\\\\:markdown table[data-prose='true'] {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] {
      +   .sm\\\\:markdown thead[data-prose='true'] {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .sm\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .sm\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose p[data-prose='true'] {
      +   .sm\\\\:markdown p[data-prose='true'] {

      ---

      -   .sm\\\\:prose img[data-prose='true'] {
      +   .sm\\\\:markdown img[data-prose='true'] {

      ---

      -   .sm\\\\:prose video[data-prose='true'] {
      +   .sm\\\\:markdown video[data-prose='true'] {

      ---

      -   .sm\\\\:prose figure[data-prose='true'] {
      +   .sm\\\\:markdown figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose figure[data-prose='true'] > * {
      +   .sm\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'] {
      +   .sm\\\\:markdown ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] {
      +   .sm\\\\:markdown ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose li[data-prose='true'] {
      +   .sm\\\\:markdown li[data-prose='true'] {

      ---

      -   .sm\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose hr[data-prose='true'] + * {
      +   .sm\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] + * {
      +   .sm\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] + * {
      +   .sm\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose h4[data-prose='true'] + * {
      +   .sm\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose > :first-child {
      +   .sm\\\\:markdown > :first-child {

      ---

      -   .sm\\\\:prose > :last-child {
      +   .sm\\\\:markdown > :last-child {

      ---

      -   .sm\\\\:prose-sm {
      +   .sm\\\\:markdown-sm {

      ---

      -   .sm\\\\:prose-sm p[data-prose='true'] {
      +   .sm\\\\:markdown-sm p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm [class~='lead'] {
      +   .sm\\\\:markdown-sm [class~='lead'] {

      ---

      -   .sm\\\\:prose-sm blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-sm blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm h1[data-prose='true'] {
      +   .sm\\\\:markdown-sm h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm h2[data-prose='true'] {
      +   .sm\\\\:markdown-sm h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm h3[data-prose='true'] {
      +   .sm\\\\:markdown-sm h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm h4[data-prose='true'] {
      +   .sm\\\\:markdown-sm h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm img[data-prose='true'] {
      +   .sm\\\\:markdown-sm img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm video[data-prose='true'] {
      +   .sm\\\\:markdown-sm video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm figure[data-prose='true'] {
      +   .sm\\\\:markdown-sm figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-sm figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-sm figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm code[data-prose='true'] {
      +   .sm\\\\:markdown-sm code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-sm h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-sm h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm pre[data-prose='true'] {
      +   .sm\\\\:markdown-sm pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm ol[data-prose='true'] {
      +   .sm\\\\:markdown-sm ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm ul[data-prose='true'] {
      +   .sm\\\\:markdown-sm ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm li[data-prose='true'] {
      +   .sm\\\\:markdown-sm li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-sm ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-sm ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-sm ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-sm ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm hr[data-prose='true'] {
      +   .sm\\\\:markdown-sm hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-sm hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-sm h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-sm h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-sm h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-sm h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-sm h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-sm h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-sm table[data-prose='true'] {
      +   .sm\\\\:markdown-sm table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-sm > :first-child {
      +   .sm\\\\:markdown-sm > :first-child {

      ---

      -   .sm\\\\:prose-sm > :last-child {
      +   .sm\\\\:markdown-sm > :last-child {

      ---

      -   .sm\\\\:prose-lg {
      +   .sm\\\\:markdown-lg {

      ---

      -   .sm\\\\:prose-lg p[data-prose='true'] {
      +   .sm\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg [class~='lead'] {
      +   .sm\\\\:markdown-lg [class~='lead'] {

      ---

      -   .sm\\\\:prose-lg blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h1[data-prose='true'] {
      +   .sm\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h2[data-prose='true'] {
      +   .sm\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h3[data-prose='true'] {
      +   .sm\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h4[data-prose='true'] {
      +   .sm\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg img[data-prose='true'] {
      +   .sm\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg video[data-prose='true'] {
      +   .sm\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg figure[data-prose='true'] {
      +   .sm\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg code[data-prose='true'] {
      +   .sm\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg pre[data-prose='true'] {
      +   .sm\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ol[data-prose='true'] {
      +   .sm\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg li[data-prose='true'] {
      +   .sm\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg hr[data-prose='true'] {
      +   .sm\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg table[data-prose='true'] {
      +   .sm\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-lg > :first-child {
      +   .sm\\\\:markdown-lg > :first-child {

      ---

      -   .sm\\\\:prose-lg > :last-child {
      +   .sm\\\\:markdown-lg > :last-child {

      ---

      -   .sm\\\\:prose-xl {
      +   .sm\\\\:markdown-xl {

      ---

      -   .sm\\\\:prose-xl p[data-prose='true'] {
      +   .sm\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl [class~='lead'] {
      +   .sm\\\\:markdown-xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-xl blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h1[data-prose='true'] {
      +   .sm\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h2[data-prose='true'] {
      +   .sm\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h3[data-prose='true'] {
      +   .sm\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h4[data-prose='true'] {
      +   .sm\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl img[data-prose='true'] {
      +   .sm\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl video[data-prose='true'] {
      +   .sm\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl figure[data-prose='true'] {
      +   .sm\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl code[data-prose='true'] {
      +   .sm\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl pre[data-prose='true'] {
      +   .sm\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ol[data-prose='true'] {
      +   .sm\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl li[data-prose='true'] {
      +   .sm\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl hr[data-prose='true'] {
      +   .sm\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl table[data-prose='true'] {
      +   .sm\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-xl > :first-child {
      +   .sm\\\\:markdown-xl > :first-child {

      ---

      -   .sm\\\\:prose-xl > :last-child {
      +   .sm\\\\:markdown-xl > :last-child {

      ---

      -   .sm\\\\:prose-2xl {
      +   .sm\\\\:markdown-2xl {

      ---

      -   .sm\\\\:prose-2xl p[data-prose='true'] {
      +   .sm\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl [class~='lead'] {
      +   .sm\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h1[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h2[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h3[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h4[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl img[data-prose='true'] {
      +   .sm\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl video[data-prose='true'] {
      +   .sm\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl figure[data-prose='true'] {
      +   .sm\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl code[data-prose='true'] {
      +   .sm\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl pre[data-prose='true'] {
      +   .sm\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ol[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl li[data-prose='true'] {
      +   .sm\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl hr[data-prose='true'] {
      +   .sm\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl table[data-prose='true'] {
      +   .sm\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-2xl > :first-child {
      +   .sm\\\\:markdown-2xl > :first-child {

      ---

      -   .sm\\\\:prose-2xl > :last-child {
      +   .sm\\\\:markdown-2xl > :last-child {

      ---

      -   .sm\\\\:prose-red a[data-prose='true'] {
      +   .sm\\\\:markdown-red a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-red a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-yellow a[data-prose='true'] {
      +   .sm\\\\:markdown-yellow a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-yellow a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-green a[data-prose='true'] {
      +   .sm\\\\:markdown-green a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-green a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-blue a[data-prose='true'] {
      +   .sm\\\\:markdown-blue a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-blue a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-indigo a[data-prose='true'] {
      +   .sm\\\\:markdown-indigo a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-indigo a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-purple a[data-prose='true'] {
      +   .sm\\\\:markdown-purple a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-purple a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-pink a[data-prose='true'] {
      +   .sm\\\\:markdown-pink a[data-prose='true'] {

      ---

      -   .sm\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-pink a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose [class~='lead'] {
      +   .md\\\\:markdown [class~='lead'] {

      ---

      -   .md\\\\:prose a[data-prose='true'] {
      +   .md\\\\:markdown a[data-prose='true'] {

      ---

      -   .md\\\\:prose strong[data-prose='true'] {
      +   .md\\\\:markdown strong[data-prose='true'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='A'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='a'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='I'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='i'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='1'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose hr[data-prose='true'] {
      +   .md\\\\:markdown hr[data-prose='true'] {

      ---

      -   .md\\\\:prose blockquote[data-prose='true'] {
      +   .md\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .md\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .md\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .md\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .md\\\\:prose h1[data-prose='true'] {
      +   .md\\\\:markdown h1[data-prose='true'] {

      ---

      -   .md\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose h2[data-prose='true'] {
      +   .md\\\\:markdown h2[data-prose='true'] {

      ---

      -   .md\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose h3[data-prose='true'] {
      +   .md\\\\:markdown h3[data-prose='true'] {

      ---

      -   .md\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose h4[data-prose='true'] {
      +   .md\\\\:markdown h4[data-prose='true'] {

      ---

      -   .md\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose code[data-prose='true'] {
      +   .md\\\\:markdown code[data-prose='true'] {

      ---

      -   .md\\\\:prose code[data-prose='true']::before {
      +   .md\\\\:markdown code[data-prose='true']::before {

      ---

      -   .md\\\\:prose code[data-prose='true']::after {
      +   .md\\\\:markdown code[data-prose='true']::after {

      ---

      -   .md\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose pre[data-prose='true'] {
      +   .md\\\\:markdown pre[data-prose='true'] {

      ---

      -   .md\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .md\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .md\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .md\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .md\\\\:prose table[data-prose='true'] {
      +   .md\\\\:markdown table[data-prose='true'] {

      ---

      -   .md\\\\:prose thead[data-prose='true'] {
      +   .md\\\\:markdown thead[data-prose='true'] {

      ---

      -   .md\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .md\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .md\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose p[data-prose='true'] {
      +   .md\\\\:markdown p[data-prose='true'] {

      ---

      -   .md\\\\:prose img[data-prose='true'] {
      +   .md\\\\:markdown img[data-prose='true'] {

      ---

      -   .md\\\\:prose video[data-prose='true'] {
      +   .md\\\\:markdown video[data-prose='true'] {

      ---

      -   .md\\\\:prose figure[data-prose='true'] {
      +   .md\\\\:markdown figure[data-prose='true'] {

      ---

      -   .md\\\\:prose figure[data-prose='true'] > * {
      +   .md\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'] {
      +   .md\\\\:markdown ol[data-prose='true'] {

      ---

      -   .md\\\\:prose ul[data-prose='true'] {
      +   .md\\\\:markdown ul[data-prose='true'] {

      ---

      -   .md\\\\:prose li[data-prose='true'] {
      +   .md\\\\:markdown li[data-prose='true'] {

      ---

      -   .md\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose hr[data-prose='true'] + * {
      +   .md\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose h2[data-prose='true'] + * {
      +   .md\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose h3[data-prose='true'] + * {
      +   .md\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose h4[data-prose='true'] + * {
      +   .md\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose > :first-child {
      +   .md\\\\:markdown > :first-child {

      ---

      -   .md\\\\:prose > :last-child {
      +   .md\\\\:markdown > :last-child {

      ---

      -   .md\\\\:prose-sm {
      +   .md\\\\:markdown-sm {

      ---

      -   .md\\\\:prose-sm p[data-prose='true'] {
      +   .md\\\\:markdown-sm p[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm [class~='lead'] {
      +   .md\\\\:markdown-sm [class~='lead'] {

      ---

      -   .md\\\\:prose-sm blockquote[data-prose='true'] {
      +   .md\\\\:markdown-sm blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm h1[data-prose='true'] {
      +   .md\\\\:markdown-sm h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm h2[data-prose='true'] {
      +   .md\\\\:markdown-sm h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm h3[data-prose='true'] {
      +   .md\\\\:markdown-sm h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm h4[data-prose='true'] {
      +   .md\\\\:markdown-sm h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm img[data-prose='true'] {
      +   .md\\\\:markdown-sm img[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm video[data-prose='true'] {
      +   .md\\\\:markdown-sm video[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm figure[data-prose='true'] {
      +   .md\\\\:markdown-sm figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm figure[data-prose='true'] > * {
      +   .md\\\\:markdown-sm figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-sm figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm code[data-prose='true'] {
      +   .md\\\\:markdown-sm code[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-sm h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-sm h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm pre[data-prose='true'] {
      +   .md\\\\:markdown-sm pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm ol[data-prose='true'] {
      +   .md\\\\:markdown-sm ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm ul[data-prose='true'] {
      +   .md\\\\:markdown-sm ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm li[data-prose='true'] {
      +   .md\\\\:markdown-sm li[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-sm ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-sm ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-sm ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-sm ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm hr[data-prose='true'] {
      +   .md\\\\:markdown-sm hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm hr[data-prose='true'] + * {
      +   .md\\\\:markdown-sm hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-sm h2[data-prose='true'] + * {
      +   .md\\\\:markdown-sm h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-sm h3[data-prose='true'] + * {
      +   .md\\\\:markdown-sm h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-sm h4[data-prose='true'] + * {
      +   .md\\\\:markdown-sm h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-sm table[data-prose='true'] {
      +   .md\\\\:markdown-sm table[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-sm > :first-child {
      +   .md\\\\:markdown-sm > :first-child {

      ---

      -   .md\\\\:prose-sm > :last-child {
      +   .md\\\\:markdown-sm > :last-child {

      ---

      -   .md\\\\:prose-lg {
      +   .md\\\\:markdown-lg {

      ---

      -   .md\\\\:prose-lg p[data-prose='true'] {
      +   .md\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg [class~='lead'] {
      +   .md\\\\:markdown-lg [class~='lead'] {

      ---

      -   .md\\\\:prose-lg blockquote[data-prose='true'] {
      +   .md\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h1[data-prose='true'] {
      +   .md\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h2[data-prose='true'] {
      +   .md\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h3[data-prose='true'] {
      +   .md\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h4[data-prose='true'] {
      +   .md\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg img[data-prose='true'] {
      +   .md\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg video[data-prose='true'] {
      +   .md\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg figure[data-prose='true'] {
      +   .md\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg figure[data-prose='true'] > * {
      +   .md\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg code[data-prose='true'] {
      +   .md\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg pre[data-prose='true'] {
      +   .md\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ol[data-prose='true'] {
      +   .md\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] {
      +   .md\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg li[data-prose='true'] {
      +   .md\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg hr[data-prose='true'] {
      +   .md\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg hr[data-prose='true'] + * {
      +   .md\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg h2[data-prose='true'] + * {
      +   .md\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg h3[data-prose='true'] + * {
      +   .md\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg h4[data-prose='true'] + * {
      +   .md\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg table[data-prose='true'] {
      +   .md\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-lg > :first-child {
      +   .md\\\\:markdown-lg > :first-child {

      ---

      -   .md\\\\:prose-lg > :last-child {
      +   .md\\\\:markdown-lg > :last-child {

      ---

      -   .md\\\\:prose-xl {
      +   .md\\\\:markdown-xl {

      ---

      -   .md\\\\:prose-xl p[data-prose='true'] {
      +   .md\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl [class~='lead'] {
      +   .md\\\\:markdown-xl [class~='lead'] {

      ---

      -   .md\\\\:prose-xl blockquote[data-prose='true'] {
      +   .md\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h1[data-prose='true'] {
      +   .md\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h2[data-prose='true'] {
      +   .md\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h3[data-prose='true'] {
      +   .md\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h4[data-prose='true'] {
      +   .md\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl img[data-prose='true'] {
      +   .md\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl video[data-prose='true'] {
      +   .md\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl figure[data-prose='true'] {
      +   .md\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl figure[data-prose='true'] > * {
      +   .md\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl code[data-prose='true'] {
      +   .md\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl pre[data-prose='true'] {
      +   .md\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ol[data-prose='true'] {
      +   .md\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] {
      +   .md\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl li[data-prose='true'] {
      +   .md\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl hr[data-prose='true'] {
      +   .md\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl hr[data-prose='true'] + * {
      +   .md\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl h2[data-prose='true'] + * {
      +   .md\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl h3[data-prose='true'] + * {
      +   .md\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl h4[data-prose='true'] + * {
      +   .md\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl table[data-prose='true'] {
      +   .md\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-xl > :first-child {
      +   .md\\\\:markdown-xl > :first-child {

      ---

      -   .md\\\\:prose-xl > :last-child {
      +   .md\\\\:markdown-xl > :last-child {

      ---

      -   .md\\\\:prose-2xl {
      +   .md\\\\:markdown-2xl {

      ---

      -   .md\\\\:prose-2xl p[data-prose='true'] {
      +   .md\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl [class~='lead'] {
      +   .md\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .md\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .md\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h1[data-prose='true'] {
      +   .md\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h2[data-prose='true'] {
      +   .md\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h3[data-prose='true'] {
      +   .md\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h4[data-prose='true'] {
      +   .md\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl img[data-prose='true'] {
      +   .md\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl video[data-prose='true'] {
      +   .md\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl figure[data-prose='true'] {
      +   .md\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .md\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl code[data-prose='true'] {
      +   .md\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl pre[data-prose='true'] {
      +   .md\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ol[data-prose='true'] {
      +   .md\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl li[data-prose='true'] {
      +   .md\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl hr[data-prose='true'] {
      +   .md\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl table[data-prose='true'] {
      +   .md\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-2xl > :first-child {
      +   .md\\\\:markdown-2xl > :first-child {

      ---

      -   .md\\\\:prose-2xl > :last-child {
      +   .md\\\\:markdown-2xl > :last-child {

      ---

      -   .md\\\\:prose-red a[data-prose='true'] {
      +   .md\\\\:markdown-red a[data-prose='true'] {

      ---

      -   .md\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-red a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-yellow a[data-prose='true'] {
      +   .md\\\\:markdown-yellow a[data-prose='true'] {

      ---

      -   .md\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-yellow a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-green a[data-prose='true'] {
      +   .md\\\\:markdown-green a[data-prose='true'] {

      ---

      -   .md\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-green a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-blue a[data-prose='true'] {
      +   .md\\\\:markdown-blue a[data-prose='true'] {

      ---

      -   .md\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-blue a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-indigo a[data-prose='true'] {
      +   .md\\\\:markdown-indigo a[data-prose='true'] {

      ---

      -   .md\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-indigo a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-purple a[data-prose='true'] {
      +   .md\\\\:markdown-purple a[data-prose='true'] {

      ---

      -   .md\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-purple a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-pink a[data-prose='true'] {
      +   .md\\\\:markdown-pink a[data-prose='true'] {

      ---

      -   .md\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-pink a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose [class~='lead'] {
      +   .lg\\\\:markdown [class~='lead'] {

      ---

      -   .lg\\\\:prose a[data-prose='true'] {
      +   .lg\\\\:markdown a[data-prose='true'] {

      ---

      -   .lg\\\\:prose strong[data-prose='true'] {
      +   .lg\\\\:markdown strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='A'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='a'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='I'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='i'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='1'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose hr[data-prose='true'] {
      +   .lg\\\\:markdown hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose blockquote[data-prose='true'] {
      +   .lg\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .lg\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .lg\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .lg\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .lg\\\\:prose h1[data-prose='true'] {
      +   .lg\\\\:markdown h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] {
      +   .lg\\\\:markdown h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] {
      +   .lg\\\\:markdown h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose h4[data-prose='true'] {
      +   .lg\\\\:markdown h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose code[data-prose='true'] {
      +   .lg\\\\:markdown code[data-prose='true'] {

      ---

      -   .lg\\\\:prose code[data-prose='true']::before {
      +   .lg\\\\:markdown code[data-prose='true']::before {

      ---

      -   .lg\\\\:prose code[data-prose='true']::after {
      +   .lg\\\\:markdown code[data-prose='true']::after {

      ---

      -   .lg\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] {
      +   .lg\\\\:markdown pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .lg\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .lg\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .lg\\\\:prose table[data-prose='true'] {
      +   .lg\\\\:markdown table[data-prose='true'] {

      ---

      -   .lg\\\\:prose thead[data-prose='true'] {
      +   .lg\\\\:markdown thead[data-prose='true'] {

      ---

      -   .lg\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .lg\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .lg\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose p[data-prose='true'] {
      +   .lg\\\\:markdown p[data-prose='true'] {

      ---

      -   .lg\\\\:prose img[data-prose='true'] {
      +   .lg\\\\:markdown img[data-prose='true'] {

      ---

      -   .lg\\\\:prose video[data-prose='true'] {
      +   .lg\\\\:markdown video[data-prose='true'] {

      ---

      -   .lg\\\\:prose figure[data-prose='true'] {
      +   .lg\\\\:markdown figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose figure[data-prose='true'] > * {
      +   .lg\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'] {
      +   .lg\\\\:markdown ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] {
      +   .lg\\\\:markdown ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose li[data-prose='true'] {
      +   .lg\\\\:markdown li[data-prose='true'] {

      ---

      -   .lg\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose hr[data-prose='true'] + * {
      +   .lg\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] + * {
      +   .lg\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] + * {
      +   .lg\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose h4[data-prose='true'] + * {
      +   .lg\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose > :first-child {
      +   .lg\\\\:markdown > :first-child {

      ---

      -   .lg\\\\:prose > :last-child {
      +   .lg\\\\:markdown > :last-child {

      ---

      -   .lg\\\\:prose-sm {
      +   .lg\\\\:markdown-sm {

      ---

      -   .lg\\\\:prose-sm p[data-prose='true'] {
      +   .lg\\\\:markdown-sm p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm [class~='lead'] {
      +   .lg\\\\:markdown-sm [class~='lead'] {

      ---

      -   .lg\\\\:prose-sm blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-sm blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm h1[data-prose='true'] {
      +   .lg\\\\:markdown-sm h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm h2[data-prose='true'] {
      +   .lg\\\\:markdown-sm h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm h3[data-prose='true'] {
      +   .lg\\\\:markdown-sm h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm h4[data-prose='true'] {
      +   .lg\\\\:markdown-sm h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm img[data-prose='true'] {
      +   .lg\\\\:markdown-sm img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm video[data-prose='true'] {
      +   .lg\\\\:markdown-sm video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm figure[data-prose='true'] {
      +   .lg\\\\:markdown-sm figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-sm figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-sm figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm code[data-prose='true'] {
      +   .lg\\\\:markdown-sm code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-sm h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-sm h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm pre[data-prose='true'] {
      +   .lg\\\\:markdown-sm pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm ol[data-prose='true'] {
      +   .lg\\\\:markdown-sm ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm ul[data-prose='true'] {
      +   .lg\\\\:markdown-sm ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm li[data-prose='true'] {
      +   .lg\\\\:markdown-sm li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-sm ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-sm ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-sm ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-sm ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm hr[data-prose='true'] {
      +   .lg\\\\:markdown-sm hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-sm hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-sm h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-sm h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-sm h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm table[data-prose='true'] {
      +   .lg\\\\:markdown-sm table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-sm > :first-child {
      +   .lg\\\\:markdown-sm > :first-child {

      ---

      -   .lg\\\\:prose-sm > :last-child {
      +   .lg\\\\:markdown-sm > :last-child {

      ---

      -   .lg\\\\:prose-lg {
      +   .lg\\\\:markdown-lg {

      ---

      -   .lg\\\\:prose-lg p[data-prose='true'] {
      +   .lg\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg [class~='lead'] {
      +   .lg\\\\:markdown-lg [class~='lead'] {

      ---

      -   .lg\\\\:prose-lg blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h1[data-prose='true'] {
      +   .lg\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h2[data-prose='true'] {
      +   .lg\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h3[data-prose='true'] {
      +   .lg\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h4[data-prose='true'] {
      +   .lg\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg img[data-prose='true'] {
      +   .lg\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg video[data-prose='true'] {
      +   .lg\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg figure[data-prose='true'] {
      +   .lg\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg code[data-prose='true'] {
      +   .lg\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg pre[data-prose='true'] {
      +   .lg\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ol[data-prose='true'] {
      +   .lg\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg li[data-prose='true'] {
      +   .lg\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg hr[data-prose='true'] {
      +   .lg\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg table[data-prose='true'] {
      +   .lg\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-lg > :first-child {
      +   .lg\\\\:markdown-lg > :first-child {

      ---

      -   .lg\\\\:prose-lg > :last-child {
      +   .lg\\\\:markdown-lg > :last-child {

      ---

      -   .lg\\\\:prose-xl {
      +   .lg\\\\:markdown-xl {

      ---

      -   .lg\\\\:prose-xl p[data-prose='true'] {
      +   .lg\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl [class~='lead'] {
      +   .lg\\\\:markdown-xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-xl blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h1[data-prose='true'] {
      +   .lg\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h2[data-prose='true'] {
      +   .lg\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h3[data-prose='true'] {
      +   .lg\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h4[data-prose='true'] {
      +   .lg\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl img[data-prose='true'] {
      +   .lg\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl video[data-prose='true'] {
      +   .lg\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl figure[data-prose='true'] {
      +   .lg\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl code[data-prose='true'] {
      +   .lg\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl pre[data-prose='true'] {
      +   .lg\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ol[data-prose='true'] {
      +   .lg\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl li[data-prose='true'] {
      +   .lg\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl hr[data-prose='true'] {
      +   .lg\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl table[data-prose='true'] {
      +   .lg\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-xl > :first-child {
      +   .lg\\\\:markdown-xl > :first-child {

      ---

      -   .lg\\\\:prose-xl > :last-child {
      +   .lg\\\\:markdown-xl > :last-child {

      ---

      -   .lg\\\\:prose-2xl {
      +   .lg\\\\:markdown-2xl {

      ---

      -   .lg\\\\:prose-2xl p[data-prose='true'] {
      +   .lg\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl [class~='lead'] {
      +   .lg\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h1[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h2[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h3[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h4[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl img[data-prose='true'] {
      +   .lg\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl video[data-prose='true'] {
      +   .lg\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl figure[data-prose='true'] {
      +   .lg\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl code[data-prose='true'] {
      +   .lg\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl pre[data-prose='true'] {
      +   .lg\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ol[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl li[data-prose='true'] {
      +   .lg\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl hr[data-prose='true'] {
      +   .lg\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl table[data-prose='true'] {
      +   .lg\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-2xl > :first-child {
      +   .lg\\\\:markdown-2xl > :first-child {

      ---

      -   .lg\\\\:prose-2xl > :last-child {
      +   .lg\\\\:markdown-2xl > :last-child {

      ---

      -   .lg\\\\:prose-red a[data-prose='true'] {
      +   .lg\\\\:markdown-red a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-red a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-yellow a[data-prose='true'] {
      +   .lg\\\\:markdown-yellow a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-yellow a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-green a[data-prose='true'] {
      +   .lg\\\\:markdown-green a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-green a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-blue a[data-prose='true'] {
      +   .lg\\\\:markdown-blue a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-blue a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-indigo a[data-prose='true'] {
      +   .lg\\\\:markdown-indigo a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-indigo a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-purple a[data-prose='true'] {
      +   .lg\\\\:markdown-purple a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-purple a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-pink a[data-prose='true'] {
      +   .lg\\\\:markdown-pink a[data-prose='true'] {

      ---

      -   .lg\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-pink a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose [class~='lead'] {
      +   .xl\\\\:markdown [class~='lead'] {

      ---

      -   .xl\\\\:prose a[data-prose='true'] {
      +   .xl\\\\:markdown a[data-prose='true'] {

      ---

      -   .xl\\\\:prose strong[data-prose='true'] {
      +   .xl\\\\:markdown strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='A'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='a'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='I'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='i'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='1'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose hr[data-prose='true'] {
      +   .xl\\\\:markdown hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose blockquote[data-prose='true'] {
      +   .xl\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .xl\\\\:prose h1[data-prose='true'] {
      +   .xl\\\\:markdown h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] {
      +   .xl\\\\:markdown h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] {
      +   .xl\\\\:markdown h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose h4[data-prose='true'] {
      +   .xl\\\\:markdown h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose code[data-prose='true'] {
      +   .xl\\\\:markdown code[data-prose='true'] {

      ---

      -   .xl\\\\:prose code[data-prose='true']::before {
      +   .xl\\\\:markdown code[data-prose='true']::before {

      ---

      -   .xl\\\\:prose code[data-prose='true']::after {
      +   .xl\\\\:markdown code[data-prose='true']::after {

      ---

      -   .xl\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] {
      +   .xl\\\\:markdown pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .xl\\\\:prose table[data-prose='true'] {
      +   .xl\\\\:markdown table[data-prose='true'] {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] {
      +   .xl\\\\:markdown thead[data-prose='true'] {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose p[data-prose='true'] {
      +   .xl\\\\:markdown p[data-prose='true'] {

      ---

      -   .xl\\\\:prose img[data-prose='true'] {
      +   .xl\\\\:markdown img[data-prose='true'] {

      ---

      -   .xl\\\\:prose video[data-prose='true'] {
      +   .xl\\\\:markdown video[data-prose='true'] {

      ---

      -   .xl\\\\:prose figure[data-prose='true'] {
      +   .xl\\\\:markdown figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose figure[data-prose='true'] > * {
      +   .xl\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'] {
      +   .xl\\\\:markdown ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] {
      +   .xl\\\\:markdown ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose li[data-prose='true'] {
      +   .xl\\\\:markdown li[data-prose='true'] {

      ---

      -   .xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose hr[data-prose='true'] + * {
      +   .xl\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] + * {
      +   .xl\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] + * {
      +   .xl\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose h4[data-prose='true'] + * {
      +   .xl\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose > :first-child {
      +   .xl\\\\:markdown > :first-child {

      ---

      -   .xl\\\\:prose > :last-child {
      +   .xl\\\\:markdown > :last-child {

      ---

      -   .xl\\\\:prose-sm {
      +   .xl\\\\:markdown-sm {

      ---

      -   .xl\\\\:prose-sm p[data-prose='true'] {
      +   .xl\\\\:markdown-sm p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm [class~='lead'] {
      +   .xl\\\\:markdown-sm [class~='lead'] {

      ---

      -   .xl\\\\:prose-sm blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-sm blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm h1[data-prose='true'] {
      +   .xl\\\\:markdown-sm h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm h2[data-prose='true'] {
      +   .xl\\\\:markdown-sm h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm h3[data-prose='true'] {
      +   .xl\\\\:markdown-sm h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm h4[data-prose='true'] {
      +   .xl\\\\:markdown-sm h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm img[data-prose='true'] {
      +   .xl\\\\:markdown-sm img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm video[data-prose='true'] {
      +   .xl\\\\:markdown-sm video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm figure[data-prose='true'] {
      +   .xl\\\\:markdown-sm figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-sm figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-sm figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm code[data-prose='true'] {
      +   .xl\\\\:markdown-sm code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-sm h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-sm h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm pre[data-prose='true'] {
      +   .xl\\\\:markdown-sm pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm ol[data-prose='true'] {
      +   .xl\\\\:markdown-sm ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm ul[data-prose='true'] {
      +   .xl\\\\:markdown-sm ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm li[data-prose='true'] {
      +   .xl\\\\:markdown-sm li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-sm ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-sm ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-sm ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-sm ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm hr[data-prose='true'] {
      +   .xl\\\\:markdown-sm hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-sm hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-sm h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-sm h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-sm h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-sm h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-sm h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-sm h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-sm table[data-prose='true'] {
      +   .xl\\\\:markdown-sm table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-sm > :first-child {
      +   .xl\\\\:markdown-sm > :first-child {

      ---

      -   .xl\\\\:prose-sm > :last-child {
      +   .xl\\\\:markdown-sm > :last-child {

      ---

      -   .xl\\\\:prose-lg {
      +   .xl\\\\:markdown-lg {

      ---

      -   .xl\\\\:prose-lg p[data-prose='true'] {
      +   .xl\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg [class~='lead'] {
      +   .xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .xl\\\\:prose-lg blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h1[data-prose='true'] {
      +   .xl\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h2[data-prose='true'] {
      +   .xl\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h3[data-prose='true'] {
      +   .xl\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h4[data-prose='true'] {
      +   .xl\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg img[data-prose='true'] {
      +   .xl\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg video[data-prose='true'] {
      +   .xl\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg figure[data-prose='true'] {
      +   .xl\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg code[data-prose='true'] {
      +   .xl\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg pre[data-prose='true'] {
      +   .xl\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ol[data-prose='true'] {
      +   .xl\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg li[data-prose='true'] {
      +   .xl\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg hr[data-prose='true'] {
      +   .xl\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg table[data-prose='true'] {
      +   .xl\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-lg > :first-child {
      +   .xl\\\\:markdown-lg > :first-child {

      ---

      -   .xl\\\\:prose-lg > :last-child {
      +   .xl\\\\:markdown-lg > :last-child {

      ---

      -   .xl\\\\:prose-xl {
      +   .xl\\\\:markdown-xl {

      ---

      -   .xl\\\\:prose-xl p[data-prose='true'] {
      +   .xl\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl [class~='lead'] {
      +   .xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-xl blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h1[data-prose='true'] {
      +   .xl\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h2[data-prose='true'] {
      +   .xl\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h3[data-prose='true'] {
      +   .xl\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h4[data-prose='true'] {
      +   .xl\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl img[data-prose='true'] {
      +   .xl\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl video[data-prose='true'] {
      +   .xl\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl figure[data-prose='true'] {
      +   .xl\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl code[data-prose='true'] {
      +   .xl\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl pre[data-prose='true'] {
      +   .xl\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ol[data-prose='true'] {
      +   .xl\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl li[data-prose='true'] {
      +   .xl\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl hr[data-prose='true'] {
      +   .xl\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl table[data-prose='true'] {
      +   .xl\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-xl > :first-child {
      +   .xl\\\\:markdown-xl > :first-child {

      ---

      -   .xl\\\\:prose-xl > :last-child {
      +   .xl\\\\:markdown-xl > :last-child {

      ---

      -   .xl\\\\:prose-2xl {
      +   .xl\\\\:markdown-2xl {

      ---

      -   .xl\\\\:prose-2xl p[data-prose='true'] {
      +   .xl\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl [class~='lead'] {
      +   .xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h1[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h2[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h3[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h4[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl img[data-prose='true'] {
      +   .xl\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl video[data-prose='true'] {
      +   .xl\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl figure[data-prose='true'] {
      +   .xl\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl code[data-prose='true'] {
      +   .xl\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl pre[data-prose='true'] {
      +   .xl\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ol[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl li[data-prose='true'] {
      +   .xl\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl hr[data-prose='true'] {
      +   .xl\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl table[data-prose='true'] {
      +   .xl\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-2xl > :first-child {
      +   .xl\\\\:markdown-2xl > :first-child {

      ---

      -   .xl\\\\:prose-2xl > :last-child {
      +   .xl\\\\:markdown-2xl > :last-child {

      ---

      -   .xl\\\\:prose-red a[data-prose='true'] {
      +   .xl\\\\:markdown-red a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-red a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-yellow a[data-prose='true'] {
      +   .xl\\\\:markdown-yellow a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-yellow a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-green a[data-prose='true'] {
      +   .xl\\\\:markdown-green a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-green a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-blue a[data-prose='true'] {
      +   .xl\\\\:markdown-blue a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-blue a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-indigo a[data-prose='true'] {
      +   .xl\\\\:markdown-indigo a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-indigo a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-purple a[data-prose='true'] {
      +   .xl\\\\:markdown-purple a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-purple a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-pink a[data-prose='true'] {
      +   .xl\\\\:markdown-pink a[data-prose='true'] {

      ---

      -   .xl\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-pink a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose [class~='lead'] {
      +   .\\\\32xl\\\\:markdown [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='A'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='a'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='I'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='i'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='1'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .\\\\32xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .\\\\32xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .\\\\32xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .\\\\32xl\\\\:prose h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose code[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown code[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose code[data-prose='true']::after {
      +   .\\\\32xl\\\\:markdown code[data-prose='true']::after {

      ---

      -   .\\\\32xl\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .\\\\32xl\\\\:prose table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose > :first-child {
      +   .\\\\32xl\\\\:markdown > :first-child {

      ---

      -   .\\\\32xl\\\\:prose > :last-child {
      +   .\\\\32xl\\\\:markdown > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm {
      +   .\\\\32xl\\\\:markdown-sm {

      ---

      -   .\\\\32xl\\\\:prose-sm p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-sm [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-sm blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-sm figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-sm ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-sm ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-sm ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-sm ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-sm ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-sm hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-sm h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-sm h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-sm h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-sm table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-sm thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-sm tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > :first-child {
      +   .\\\\32xl\\\\:markdown-sm > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > :last-child {
      +   .\\\\32xl\\\\:markdown-sm > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg {
      +   .\\\\32xl\\\\:markdown-lg {

      ---

      -   .\\\\32xl\\\\:prose-lg p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-lg blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :first-child {
      +   .\\\\32xl\\\\:markdown-lg > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :last-child {
      +   .\\\\32xl\\\\:markdown-lg > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl {
      +   .\\\\32xl\\\\:markdown-xl {

      ---

      -   .\\\\32xl\\\\:prose-xl p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-xl blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :first-child {
      +   .\\\\32xl\\\\:markdown-xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :last-child {
      +   .\\\\32xl\\\\:markdown-xl > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl {
      +   .\\\\32xl\\\\:markdown-2xl {

      ---

      -   .\\\\32xl\\\\:prose-2xl p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :first-child {
      +   .\\\\32xl\\\\:markdown-2xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :last-child {
      +   .\\\\32xl\\\\:markdown-2xl > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-red a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-red a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-red a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-yellow a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-yellow a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-yellow a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-green a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-green a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-green a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-blue a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-blue a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-blue a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-indigo a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-indigo a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-indigo a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-purple a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-purple a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-purple a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-pink a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-pink a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-pink a[data-prose='true'] code[data-prose='true'] {

    "
  `)
})

it('should be possible to change the default modifiers', async () => {
  expect(await diffOnly({ modifiers: ['sm', 'lg', 'xl' /**, '2xl' */] })).toMatchInlineSnapshot(`
    "

      - .prose-2xl {
      -   font-size: 1.5rem;
      -   line-height: 1.6666667;
      - }
      -
      - .prose-2xl p[data-prose='true'] {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl [class~='lead'] {
      -   font-size: 1.25em;
      -   line-height: 1.4666667;
      -   margin-top: 1.0666667em;
      -   margin-bottom: 1.0666667em;
      - }
      -
      - .prose-2xl blockquote[data-prose='true'] {
      -   margin-top: 1.7777778em;
      -   margin-bottom: 1.7777778em;
      -   padding-left: 1.1111111em;
      - }
      -
      - .prose-2xl h1[data-prose='true'] {
      -   font-size: 2.6666667em;
      -   margin-top: 0;
      -   margin-bottom: 0.875em;
      -   line-height: 1;
      - }
      -
      - .prose-2xl h2[data-prose='true'] {
      -   font-size: 2em;
      -   margin-top: 1.5em;
      -   margin-bottom: 0.8333333em;
      -   line-height: 1.0833333;
      - }
      -
      - .prose-2xl h3[data-prose='true'] {
      -   font-size: 1.5em;
      -   margin-top: 1.5555556em;
      -   margin-bottom: 0.6666667em;
      -   line-height: 1.2222222;
      - }
      -
      - .prose-2xl h4[data-prose='true'] {
      -   margin-top: 1.6666667em;
      -   margin-bottom: 0.6666667em;
      -   line-height: 1.5;
      - }
      -
      - .prose-2xl img[data-prose='true'] {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl video[data-prose='true'] {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl figure[data-prose='true'] {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl figure[data-prose='true'] > * {
      -   margin-top: 0;
      -   margin-bottom: 0;
      - }
      -
      - .prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      -   font-size: 0.8333333em;
      -   line-height: 1.6;
      -   margin-top: 1em;
      - }
      -
      - .prose-2xl code[data-prose='true'] {
      -   font-size: 0.8333333em;
      - }
      -
      - .prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      -   font-size: 0.875em;
      - }
      -
      - .prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      -   font-size: 0.8888889em;
      - }
      -
      - .prose-2xl pre[data-prose='true'] {
      -   font-size: 0.8333333em;
      -   line-height: 1.8;
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      -   border-radius: 0.5rem;
      -   padding-top: 1.2em;
      -   padding-right: 1.6em;
      -   padding-bottom: 1.2em;
      -   padding-left: 1.6em;
      - }
      -
      - .prose-2xl ol[data-prose='true'] {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl ul[data-prose='true'] {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl li[data-prose='true'] {
      -   margin-top: 0.5em;
      -   margin-bottom: 0.5em;
      - }
      -
      - .prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      -   padding-left: 1.6666667em;
      - }
      -
      - .prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      -   left: 0;
      - }
      -
      - .prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      -   padding-left: 1.6666667em;
      - }
      -
      - .prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      -   width: 0.3333333em;
      -   height: 0.3333333em;
      -   top: calc(0.8333333em - 0.1666667em);
      -   left: 0.25em;
      - }
      -
      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -   margin-top: 0.8333333em;
      -   margin-bottom: 0.8333333em;
      - }
      -
      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -   margin-top: 1.3333333em;
      - }
      -
      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -   margin-top: 1.3333333em;
      - }
      -
      - .prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl ul[data-prose='true'] ul[data-prose='true'], .prose-2xl ul[data-prose='true'] ol[data-prose='true'], .prose-2xl ol[data-prose='true'] ul[data-prose='true'], .prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      -   margin-top: 0.6666667em;
      -   margin-bottom: 0.6666667em;
      - }
      -
      - .prose-2xl hr[data-prose='true'] {
      -   margin-top: 3em;
      -   margin-bottom: 3em;
      - }
      -
      - .prose-2xl hr[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl h2[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl h3[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl h4[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl table[data-prose='true'] {
      -   font-size: 0.8333333em;
      -   line-height: 1.4;
      - }
      -
      - .prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      -   padding-right: 0.6em;
      -   padding-bottom: 0.8em;
      -   padding-left: 0.6em;
      - }
      -
      - .prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      -   padding-top: 0.8em;
      -   padding-right: 0.6em;
      -   padding-bottom: 0.8em;
      -   padding-left: 0.6em;
      - }
      -
      - .prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose-2xl > :first-child {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl > :last-child {
      -   margin-bottom: 0;
      - }
      -
      - .prose-red a[data-prose='true'] {
      -   color: #dc2626;
      - }
      -
      - .prose-red a[data-prose='true'] code[data-prose='true'] {
      -   color: #dc2626;
      - }
      -
      - .prose-yellow a[data-prose='true'] {
      -   color: #d97706;
      - }
      -
      - .prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -   color: #d97706;
      - }
      -
      - .prose-green a[data-prose='true'] {
      -   color: #059669;
      - }
      -
      - .prose-green a[data-prose='true'] code[data-prose='true'] {
      -   color: #059669;
      - }
      -
      - .prose-blue a[data-prose='true'] {
      -   color: #2563eb;
      - }
      -
      - .prose-blue a[data-prose='true'] code[data-prose='true'] {
      -   color: #2563eb;
      - }
      -
      - .prose-indigo a[data-prose='true'] {
      -   color: #4f46e5;
      - }
      -
      - .prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -   color: #4f46e5;
      - }
      -
      - .prose-purple a[data-prose='true'] {
      -   color: #7c3aed;
      - }
      -
      - .prose-purple a[data-prose='true'] code[data-prose='true'] {
      -   color: #7c3aed;
      - }
      -
      - .prose-pink a[data-prose='true'] {
      -   color: #db2777;
      - }
      -
      - .prose-pink a[data-prose='true'] code[data-prose='true'] {
      -   color: #db2777;
      - }
      -

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .sm\\\\:prose-2xl p[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl blockquote[data-prose='true'] {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .sm\\\\:prose-2xl h1[data-prose='true'] {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .sm\\\\:prose-2xl h2[data-prose='true'] {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .sm\\\\:prose-2xl h3[data-prose='true'] {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .sm\\\\:prose-2xl h4[data-prose='true'] {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .sm\\\\:prose-2xl img[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl video[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl figure[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl figure[data-prose='true'] > * {
      -     margin-top: 0;

      ---

      -   }
      -
      -   .sm\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .sm\\\\:prose-2xl code[data-prose='true'] {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.875em;
      -   }
      -
      -   .sm\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-2xl pre[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl ol[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl ul[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl li[data-prose='true'] {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .sm\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;

      ---

      -
      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl hr[data-prose='true'] {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .sm\\\\:prose-2xl hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl table[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .sm\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;
      -   }

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .md\\\\:prose-2xl p[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .md\\\\:prose-2xl blockquote[data-prose='true'] {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .md\\\\:prose-2xl h1[data-prose='true'] {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .md\\\\:prose-2xl h2[data-prose='true'] {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .md\\\\:prose-2xl h3[data-prose='true'] {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .md\\\\:prose-2xl h4[data-prose='true'] {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .md\\\\:prose-2xl img[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl video[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl figure[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl figure[data-prose='true'] > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .md\\\\:prose-2xl code[data-prose='true'] {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .md\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.875em;
      -   }
      -
      -   .md\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-2xl pre[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .md\\\\:prose-2xl ol[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl ul[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl li[data-prose='true'] {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .md\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl hr[data-prose='true'] {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .md\\\\:prose-2xl hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl table[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl > :last-child {

      ---

      -   }
      -
      -   .md\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .md\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .lg\\\\:prose-2xl p[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl blockquote[data-prose='true'] {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .lg\\\\:prose-2xl h1[data-prose='true'] {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .lg\\\\:prose-2xl h2[data-prose='true'] {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .lg\\\\:prose-2xl h3[data-prose='true'] {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .lg\\\\:prose-2xl h4[data-prose='true'] {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .lg\\\\:prose-2xl img[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl video[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl figure[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl figure[data-prose='true'] > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .lg\\\\:prose-2xl code[data-prose='true'] {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.875em;
      -   }
      -
      -   .lg\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-2xl pre[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl ol[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl ul[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl li[data-prose='true'] {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .lg\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl hr[data-prose='true'] {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .lg\\\\:prose-2xl hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl table[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl > :last-child {

      ---

      -   }
      -
      -   .lg\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;

      ---

      -
      -   .lg\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .lg\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;
      -   }

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .xl\\\\:prose-2xl p[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl blockquote[data-prose='true'] {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .xl\\\\:prose-2xl h1[data-prose='true'] {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .xl\\\\:prose-2xl h2[data-prose='true'] {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .xl\\\\:prose-2xl h3[data-prose='true'] {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .xl\\\\:prose-2xl h4[data-prose='true'] {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .xl\\\\:prose-2xl img[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl video[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl figure[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl figure[data-prose='true'] > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .xl\\\\:prose-2xl code[data-prose='true'] {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.875em;
      -   }
      -
      -   .xl\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-2xl pre[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl ol[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl ul[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl li[data-prose='true'] {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl hr[data-prose='true'] {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .xl\\\\:prose-2xl hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl table[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl > :last-child {

      ---

      -   }
      -
      -   .xl\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;

      ---

      -
      -   .xl\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .xl\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;
      -   }

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl p[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl blockquote[data-prose='true'] {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h1[data-prose='true'] {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h4[data-prose='true'] {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl img[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl video[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] > * {
      -     margin-top: 0;

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl code[data-prose='true'] {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.875em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl pre[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl li[data-prose='true'] {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl hr[data-prose='true'] {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl table[data-prose='true'] {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;

    "
  `)
})

it('should be possible to change the default modifiers and change the className', async () => {
  expect(await diffOnly({ modifiers: [/** 'sm', */ 'lg', 'xl', '2xl'], className: 'markdown' }))
    .toMatchInlineSnapshot(`
    "

      - .prose {
      + .markdown {

      ---

      - .prose [class~='lead'] {
      + .markdown [class~='lead'] {

      ---

      - .prose a[data-prose='true'] {
      + .markdown a[data-prose='true'] {

      ---

      - .prose strong[data-prose='true'] {
      + .markdown strong[data-prose='true'] {

      ---

      - .prose ol[data-prose='true'][type='A'] {
      + .markdown ol[data-prose='true'][type='A'] {

      ---

      - .prose ol[data-prose='true'][type='a'] {
      + .markdown ol[data-prose='true'][type='a'] {

      ---

      - .prose ol[data-prose='true'][type='A' s] {
      + .markdown ol[data-prose='true'][type='A' s] {

      ---

      - .prose ol[data-prose='true'][type='a' s] {
      + .markdown ol[data-prose='true'][type='a' s] {

      ---

      - .prose ol[data-prose='true'][type='I'] {
      + .markdown ol[data-prose='true'][type='I'] {

      ---

      - .prose ol[data-prose='true'][type='i'] {
      + .markdown ol[data-prose='true'][type='i'] {

      ---

      - .prose ol[data-prose='true'][type='I' s] {
      + .markdown ol[data-prose='true'][type='I' s] {

      ---

      - .prose ol[data-prose='true'][type='i' s] {
      + .markdown ol[data-prose='true'][type='i' s] {

      ---

      - .prose ol[data-prose='true'][type='1'] {
      + .markdown ol[data-prose='true'][type='1'] {

      ---

      - .prose ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose hr[data-prose='true'] {
      + .markdown hr[data-prose='true'] {

      ---

      - .prose blockquote[data-prose='true'] {
      + .markdown blockquote[data-prose='true'] {

      ---

      - .prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      + .markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      - .prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      + .markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      - .prose h1[data-prose='true'] {
      + .markdown h1[data-prose='true'] {

      ---

      - .prose h1[data-prose='true'] strong[data-prose='true'] {
      + .markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose h2[data-prose='true'] {
      + .markdown h2[data-prose='true'] {

      ---

      - .prose h2[data-prose='true'] strong[data-prose='true'] {
      + .markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose h3[data-prose='true'] {
      + .markdown h3[data-prose='true'] {

      ---

      - .prose h3[data-prose='true'] strong[data-prose='true'] {
      + .markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose h4[data-prose='true'] {
      + .markdown h4[data-prose='true'] {

      ---

      - .prose h4[data-prose='true'] strong[data-prose='true'] {
      + .markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      - .prose figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose code[data-prose='true'] {
      + .markdown code[data-prose='true'] {

      ---

      - .prose code[data-prose='true']::before {
      + .markdown code[data-prose='true']::before {

      ---

      - .prose code[data-prose='true']::after {
      + .markdown code[data-prose='true']::after {

      ---

      - .prose a[data-prose='true'] code[data-prose='true'] {
      + .markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose pre[data-prose='true'] {
      + .markdown pre[data-prose='true'] {

      ---

      - .prose pre[data-prose='true'] code[data-prose='true'] {
      + .markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose pre[data-prose='true'] code[data-prose='true']::before {
      + .markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      - .prose pre[data-prose='true'] code[data-prose='true']::after {
      + .markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      - .prose table[data-prose='true'] {
      + .markdown table[data-prose='true'] {

      ---

      - .prose thead[data-prose='true'] {
      + .markdown thead[data-prose='true'] {

      ---

      - .prose thead[data-prose='true'] th[data-prose='true'] {
      + .markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose tbody[data-prose='true'] tr[data-prose='true'] {
      + .markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      - .prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      + .markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      - .prose tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose {
      + .markdown {

      ---

      - .prose p[data-prose='true'] {
      + .markdown p[data-prose='true'] {

      ---

      - .prose img[data-prose='true'] {
      + .markdown img[data-prose='true'] {

      ---

      - .prose video[data-prose='true'] {
      + .markdown video[data-prose='true'] {

      ---

      - .prose figure[data-prose='true'] {
      + .markdown figure[data-prose='true'] {

      ---

      - .prose figure[data-prose='true'] > * {
      + .markdown figure[data-prose='true'] > * {

      ---

      - .prose h2[data-prose='true'] code[data-prose='true'] {
      + .markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose h3[data-prose='true'] code[data-prose='true'] {
      + .markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose ol[data-prose='true'] {
      + .markdown ol[data-prose='true'] {

      ---

      - .prose ul[data-prose='true'] {
      + .markdown ul[data-prose='true'] {

      ---

      - .prose li[data-prose='true'] {
      + .markdown li[data-prose='true'] {

      ---

      - .prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose ul[data-prose='true'] ul[data-prose='true'], .prose ul[data-prose='true'] ol[data-prose='true'], .prose ol[data-prose='true'] ul[data-prose='true'], .prose ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown ul[data-prose='true'] ul[data-prose='true'], .markdown ul[data-prose='true'] ol[data-prose='true'], .markdown ol[data-prose='true'] ul[data-prose='true'], .markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - }
      -
      - .prose hr[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose h2[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose h3[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose h4[data-prose='true'] + * {
      -   margin-top: 0;
      - }
      -
      - .prose thead[data-prose='true'] th[data-prose='true']:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose thead[data-prose='true'] th[data-prose='true']:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose > :first-child {
      -   margin-top: 0;
      - }
      -
      - .prose > :last-child {
      -   margin-bottom: 0;
      - }
      -
      - .prose-sm {
      -   font-size: 0.875rem;
      -   line-height: 1.7142857;
      - }
      -
      - .prose-sm p[data-prose='true'] {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm [class~='lead'] {
      -   font-size: 1.2857143em;
      -   line-height: 1.5555556;
      -   margin-top: 0.8888889em;
      -   margin-bottom: 0.8888889em;
      - }
      -
      - .prose-sm blockquote[data-prose='true'] {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      -   padding-left: 1.1111111em;
      - }
      -
      - .prose-sm h1[data-prose='true'] {
      -   font-size: 2.1428571em;
      -   margin-top: 0;
      -   margin-bottom: 0.8em;
      -   line-height: 1.2;

      ---

      - .prose-sm h2[data-prose='true'] {
      -   font-size: 1.4285714em;
      -   margin-top: 1.6em;
      -   margin-bottom: 0.8em;
      -   line-height: 1.4;
      - }
      -
      - .prose-sm h3[data-prose='true'] {
      -   font-size: 1.2857143em;
      -   margin-top: 1.5555556em;
      -   margin-bottom: 0.4444444em;
      -   line-height: 1.5555556;
      - }
      -
      - .prose-sm h4[data-prose='true'] {
      -   margin-top: 1.4285714em;
      -   margin-bottom: 0.5714286em;
      -   line-height: 1.4285714;
      - }
      -
      - .prose-sm img[data-prose='true'] {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm video[data-prose='true'] {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm figure[data-prose='true'] {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm figure[data-prose='true'] > * {
      -   margin-top: 0;
      -   margin-bottom: 0;
      - }
      -
      - .prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      -   font-size: 0.8571429em;
      -   line-height: 1.3333333;
      -   margin-top: 0.6666667em;
      - }
      -
      - .prose-sm code[data-prose='true'] {
      -   font-size: 0.8571429em;
      - }
      -
      - .prose-sm h2[data-prose='true'] code[data-prose='true'] {
      -   font-size: 0.9em;
      - }
      -
      - .prose-sm h3[data-prose='true'] code[data-prose='true'] {
      -   font-size: 0.8888889em;
      - }
      -
      - .prose-sm pre[data-prose='true'] {
      -   font-size: 0.8571429em;
      -   line-height: 1.6666667;
      -   margin-top: 1.6666667em;
      -   margin-bottom: 1.6666667em;
      -   border-radius: 0.25rem;
      -   padding-top: 0.6666667em;
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm ol[data-prose='true'] {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm ul[data-prose='true'] {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm li[data-prose='true'] {
      -   margin-top: 0.2857143em;
      -   margin-bottom: 0.2857143em;
      - }
      -
      - .prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      -   padding-left: 1.5714286em;
      - }
      -
      - .prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      -   left: 0;
      - }
      -
      - .prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      -   padding-left: 1.5714286em;
      - }
      -
      - .prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      -   height: 0.3571429em;
      -   width: 0.3571429em;
      -   top: calc(0.8571429em - 0.1785714em);
      -   left: 0.2142857em;
      - }
      -
      - .prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -   margin-top: 0.5714286em;
      -   margin-bottom: 0.5714286em;
      - }
      -
      - .prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -   margin-top: 1.1428571em;
      - }
      -
      - .prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -   margin-top: 1.1428571em;
      - }
      -
      - .prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm ul[data-prose='true'] ul[data-prose='true'], .prose-sm ul[data-prose='true'] ol[data-prose='true'], .prose-sm ol[data-prose='true'] ul[data-prose='true'], .prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      -   margin-top: 0.5714286em;
      -   margin-bottom: 0.5714286em;
      - }
      -
      - .prose-sm hr[data-prose='true'] {
      -   margin-top: 2.8571429em;
      -   margin-bottom: 2.8571429em;
      - }
      -
      - .prose-sm hr[data-prose='true'] + * {
      + .markdown hr[data-prose='true'] + * {

      ---

      - .prose-sm h2[data-prose='true'] + * {
      + .markdown h2[data-prose='true'] + * {

      ---

      - .prose-sm h3[data-prose='true'] + * {
      + .markdown h3[data-prose='true'] + * {

      ---

      - .prose-sm h4[data-prose='true'] + * {
      + .markdown h4[data-prose='true'] + * {

      ---

      - .prose-sm table[data-prose='true'] {
      -   font-size: 0.8571429em;
      -   line-height: 1.5;
      - }
      -
      - .prose-sm thead[data-prose='true'] th[data-prose='true'] {
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      -   padding-top: 0.6666667em;
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-sm > :first-child {
      + .markdown > :first-child {

      ---

      - .prose-sm > :last-child {
      + .markdown > :last-child {

      ---

      - .prose-lg {
      + .markdown-lg {

      ---

      - .prose-lg p[data-prose='true'] {
      + .markdown-lg p[data-prose='true'] {

      ---

      - .prose-lg [class~='lead'] {
      + .markdown-lg [class~='lead'] {

      ---

      - .prose-lg blockquote[data-prose='true'] {
      + .markdown-lg blockquote[data-prose='true'] {

      ---

      - .prose-lg h1[data-prose='true'] {
      + .markdown-lg h1[data-prose='true'] {

      ---

      - .prose-lg h2[data-prose='true'] {
      + .markdown-lg h2[data-prose='true'] {

      ---

      - .prose-lg h3[data-prose='true'] {
      + .markdown-lg h3[data-prose='true'] {

      ---

      - .prose-lg h4[data-prose='true'] {
      + .markdown-lg h4[data-prose='true'] {

      ---

      - .prose-lg img[data-prose='true'] {
      + .markdown-lg img[data-prose='true'] {

      ---

      - .prose-lg video[data-prose='true'] {
      + .markdown-lg video[data-prose='true'] {

      ---

      - .prose-lg figure[data-prose='true'] {
      + .markdown-lg figure[data-prose='true'] {

      ---

      - .prose-lg figure[data-prose='true'] > * {
      + .markdown-lg figure[data-prose='true'] > * {

      ---

      - .prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-lg code[data-prose='true'] {
      + .markdown-lg code[data-prose='true'] {

      ---

      - .prose-lg h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-lg h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-lg pre[data-prose='true'] {
      + .markdown-lg pre[data-prose='true'] {

      ---

      - .prose-lg ol[data-prose='true'] {
      + .markdown-lg ol[data-prose='true'] {

      ---

      - .prose-lg ul[data-prose='true'] {
      + .markdown-lg ul[data-prose='true'] {

      ---

      - .prose-lg li[data-prose='true'] {
      + .markdown-lg li[data-prose='true'] {

      ---

      - .prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-lg ul[data-prose='true'] ul[data-prose='true'], .prose-lg ul[data-prose='true'] ol[data-prose='true'], .prose-lg ol[data-prose='true'] ul[data-prose='true'], .prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-lg ul[data-prose='true'] ul[data-prose='true'], .markdown-lg ul[data-prose='true'] ol[data-prose='true'], .markdown-lg ol[data-prose='true'] ul[data-prose='true'], .markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-lg hr[data-prose='true'] {
      + .markdown-lg hr[data-prose='true'] {

      ---

      - .prose-lg hr[data-prose='true'] + * {
      + .markdown-lg hr[data-prose='true'] + * {

      ---

      - .prose-lg h2[data-prose='true'] + * {
      + .markdown-lg h2[data-prose='true'] + * {

      ---

      - .prose-lg h3[data-prose='true'] + * {
      + .markdown-lg h3[data-prose='true'] + * {

      ---

      - .prose-lg h4[data-prose='true'] + * {
      + .markdown-lg h4[data-prose='true'] + * {

      ---

      - .prose-lg table[data-prose='true'] {
      + .markdown-lg table[data-prose='true'] {

      ---

      - .prose-lg thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-lg > :first-child {
      + .markdown-lg > :first-child {

      ---

      - .prose-lg > :last-child {
      + .markdown-lg > :last-child {

      ---

      - .prose-xl {
      + .markdown-xl {

      ---

      - .prose-xl p[data-prose='true'] {
      + .markdown-xl p[data-prose='true'] {

      ---

      - .prose-xl [class~='lead'] {
      + .markdown-xl [class~='lead'] {

      ---

      - .prose-xl blockquote[data-prose='true'] {
      + .markdown-xl blockquote[data-prose='true'] {

      ---

      - .prose-xl h1[data-prose='true'] {
      + .markdown-xl h1[data-prose='true'] {

      ---

      - .prose-xl h2[data-prose='true'] {
      + .markdown-xl h2[data-prose='true'] {

      ---

      - .prose-xl h3[data-prose='true'] {
      + .markdown-xl h3[data-prose='true'] {

      ---

      - .prose-xl h4[data-prose='true'] {
      + .markdown-xl h4[data-prose='true'] {

      ---

      - .prose-xl img[data-prose='true'] {
      + .markdown-xl img[data-prose='true'] {

      ---

      - .prose-xl video[data-prose='true'] {
      + .markdown-xl video[data-prose='true'] {

      ---

      - .prose-xl figure[data-prose='true'] {
      + .markdown-xl figure[data-prose='true'] {

      ---

      - .prose-xl figure[data-prose='true'] > * {
      + .markdown-xl figure[data-prose='true'] > * {

      ---

      - .prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-xl code[data-prose='true'] {
      + .markdown-xl code[data-prose='true'] {

      ---

      - .prose-xl h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-xl h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-xl pre[data-prose='true'] {
      + .markdown-xl pre[data-prose='true'] {

      ---

      - .prose-xl ol[data-prose='true'] {
      + .markdown-xl ol[data-prose='true'] {

      ---

      - .prose-xl ul[data-prose='true'] {
      + .markdown-xl ul[data-prose='true'] {

      ---

      - .prose-xl li[data-prose='true'] {
      + .markdown-xl li[data-prose='true'] {

      ---

      - .prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-xl ul[data-prose='true'] ul[data-prose='true'], .prose-xl ul[data-prose='true'] ol[data-prose='true'], .prose-xl ol[data-prose='true'] ul[data-prose='true'], .prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-xl ul[data-prose='true'] ul[data-prose='true'], .markdown-xl ul[data-prose='true'] ol[data-prose='true'], .markdown-xl ol[data-prose='true'] ul[data-prose='true'], .markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-xl hr[data-prose='true'] {
      + .markdown-xl hr[data-prose='true'] {

      ---

      - .prose-xl hr[data-prose='true'] + * {
      + .markdown-xl hr[data-prose='true'] + * {

      ---

      - .prose-xl h2[data-prose='true'] + * {
      + .markdown-xl h2[data-prose='true'] + * {

      ---

      - .prose-xl h3[data-prose='true'] + * {
      + .markdown-xl h3[data-prose='true'] + * {

      ---

      - .prose-xl h4[data-prose='true'] + * {
      + .markdown-xl h4[data-prose='true'] + * {

      ---

      - .prose-xl table[data-prose='true'] {
      + .markdown-xl table[data-prose='true'] {

      ---

      - .prose-xl thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-xl > :first-child {
      + .markdown-xl > :first-child {

      ---

      - .prose-xl > :last-child {
      + .markdown-xl > :last-child {

      ---

      - .prose-2xl {
      + .markdown-2xl {

      ---

      - .prose-2xl p[data-prose='true'] {
      + .markdown-2xl p[data-prose='true'] {

      ---

      - .prose-2xl [class~='lead'] {
      + .markdown-2xl [class~='lead'] {

      ---

      - .prose-2xl blockquote[data-prose='true'] {
      + .markdown-2xl blockquote[data-prose='true'] {

      ---

      - .prose-2xl h1[data-prose='true'] {
      + .markdown-2xl h1[data-prose='true'] {

      ---

      - .prose-2xl h2[data-prose='true'] {
      + .markdown-2xl h2[data-prose='true'] {

      ---

      - .prose-2xl h3[data-prose='true'] {
      + .markdown-2xl h3[data-prose='true'] {

      ---

      - .prose-2xl h4[data-prose='true'] {
      + .markdown-2xl h4[data-prose='true'] {

      ---

      - .prose-2xl img[data-prose='true'] {
      + .markdown-2xl img[data-prose='true'] {

      ---

      - .prose-2xl video[data-prose='true'] {
      + .markdown-2xl video[data-prose='true'] {

      ---

      - .prose-2xl figure[data-prose='true'] {
      + .markdown-2xl figure[data-prose='true'] {

      ---

      - .prose-2xl figure[data-prose='true'] > * {
      + .markdown-2xl figure[data-prose='true'] > * {

      ---

      - .prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      + .markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      - .prose-2xl code[data-prose='true'] {
      + .markdown-2xl code[data-prose='true'] {

      ---

      - .prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      + .markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      + .markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      - .prose-2xl pre[data-prose='true'] {
      + .markdown-2xl pre[data-prose='true'] {

      ---

      - .prose-2xl ol[data-prose='true'] {
      + .markdown-2xl ol[data-prose='true'] {

      ---

      - .prose-2xl ul[data-prose='true'] {
      + .markdown-2xl ul[data-prose='true'] {

      ---

      - .prose-2xl li[data-prose='true'] {
      + .markdown-2xl li[data-prose='true'] {

      ---

      - .prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      + .markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      + .markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      - .prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      + .markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      + .markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      + .markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      - .prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      + .markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      - .prose-2xl ul[data-prose='true'] ul[data-prose='true'], .prose-2xl ul[data-prose='true'] ol[data-prose='true'], .prose-2xl ol[data-prose='true'] ul[data-prose='true'], .prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      + .markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      - .prose-2xl hr[data-prose='true'] {
      + .markdown-2xl hr[data-prose='true'] {

      ---

      - .prose-2xl hr[data-prose='true'] + * {
      + .markdown-2xl hr[data-prose='true'] + * {

      ---

      - .prose-2xl h2[data-prose='true'] + * {
      + .markdown-2xl h2[data-prose='true'] + * {

      ---

      - .prose-2xl h3[data-prose='true'] + * {
      + .markdown-2xl h3[data-prose='true'] + * {

      ---

      - .prose-2xl h4[data-prose='true'] + * {
      + .markdown-2xl h4[data-prose='true'] + * {

      ---

      - .prose-2xl table[data-prose='true'] {
      + .markdown-2xl table[data-prose='true'] {

      ---

      - .prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      + .markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      - .prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      + .markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      - .prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      + .markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      - .prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      + .markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      - .prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      + .markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      - .prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      + .markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      - .prose-2xl > :first-child {
      + .markdown-2xl > :first-child {

      ---

      - .prose-2xl > :last-child {
      + .markdown-2xl > :last-child {

      ---

      - }
      -
      - .prose-red a[data-prose='true'] {
      -   color: #dc2626;
      - }
      -
      - .prose-red a[data-prose='true'] code[data-prose='true'] {
      -   color: #dc2626;
      - }
      -
      - .prose-yellow a[data-prose='true'] {
      -   color: #d97706;
      - }
      -
      - .prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -   color: #d97706;

      ---

      - .prose-green a[data-prose='true'] {
      -   color: #059669;
      - }
      -
      - .prose-green a[data-prose='true'] code[data-prose='true'] {
      -   color: #059669;
      - }
      -
      - .prose-blue a[data-prose='true'] {
      -   color: #2563eb;
      - }
      -
      - .prose-blue a[data-prose='true'] code[data-prose='true'] {
      -   color: #2563eb;
      - }
      -
      - .prose-indigo a[data-prose='true'] {
      -   color: #4f46e5;
      - }
      -
      - .prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -   color: #4f46e5;
      - }
      -
      - .prose-purple a[data-prose='true'] {
      -   color: #7c3aed;
      - }
      -
      - .prose-purple a[data-prose='true'] code[data-prose='true'] {
      -   color: #7c3aed;
      - }
      -
      - .prose-pink a[data-prose='true'] {
      -   color: #db2777;
      - }
      -
      - .prose-pink a[data-prose='true'] code[data-prose='true'] {
      -   color: #db2777;
      - }
      -

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose [class~='lead'] {
      +   .sm\\\\:markdown [class~='lead'] {

      ---

      -   .sm\\\\:prose a[data-prose='true'] {
      +   .sm\\\\:markdown a[data-prose='true'] {

      ---

      -   .sm\\\\:prose strong[data-prose='true'] {
      +   .sm\\\\:markdown strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='A'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='a'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='I'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='i'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'][type='1'] {
      +   .sm\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose hr[data-prose='true'] {
      +   .sm\\\\:markdown hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose blockquote[data-prose='true'] {
      +   .sm\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .sm\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .sm\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .sm\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .sm\\\\:prose h1[data-prose='true'] {
      +   .sm\\\\:markdown h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] {
      +   .sm\\\\:markdown h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] {
      +   .sm\\\\:markdown h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose h4[data-prose='true'] {
      +   .sm\\\\:markdown h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .sm\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .sm\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose code[data-prose='true'] {
      +   .sm\\\\:markdown code[data-prose='true'] {

      ---

      -   .sm\\\\:prose code[data-prose='true']::before {
      +   .sm\\\\:markdown code[data-prose='true']::before {

      ---

      -   .sm\\\\:prose code[data-prose='true']::after {
      +   .sm\\\\:markdown code[data-prose='true']::after {

      ---

      -   .sm\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] {
      +   .sm\\\\:markdown pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .sm\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .sm\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .sm\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .sm\\\\:prose table[data-prose='true'] {
      +   .sm\\\\:markdown table[data-prose='true'] {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] {
      +   .sm\\\\:markdown thead[data-prose='true'] {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .sm\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .sm\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose p[data-prose='true'] {
      +   .sm\\\\:markdown p[data-prose='true'] {

      ---

      -   .sm\\\\:prose img[data-prose='true'] {
      +   .sm\\\\:markdown img[data-prose='true'] {

      ---

      -   .sm\\\\:prose video[data-prose='true'] {
      +   .sm\\\\:markdown video[data-prose='true'] {

      ---

      -   .sm\\\\:prose figure[data-prose='true'] {
      +   .sm\\\\:markdown figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose figure[data-prose='true'] > * {
      +   .sm\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose ol[data-prose='true'] {
      +   .sm\\\\:markdown ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] {
      +   .sm\\\\:markdown ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose li[data-prose='true'] {
      +   .sm\\\\:markdown li[data-prose='true'] {

      ---

      -   .sm\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   }
      -
      -   .sm\\\\:prose hr[data-prose='true'] + * {
      -     margin-top: 0;

      ---

      -   .sm\\\\:prose h2[data-prose='true'] + * {
      +   .sm\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose h3[data-prose='true'] + * {
      +   .sm\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose h4[data-prose='true'] + * {
      +   .sm\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .sm\\\\:prose-sm p[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-sm blockquote[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .sm\\\\:prose-sm h1[data-prose='true'] {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .sm\\\\:prose-sm h2[data-prose='true'] {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .sm\\\\:prose-sm h3[data-prose='true'] {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .sm\\\\:prose-sm h4[data-prose='true'] {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .sm\\\\:prose-sm img[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm video[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm figure[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm figure[data-prose='true'] > * {
      +   .sm\\\\:markdown h4[data-prose='true'] + * {

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;

      ---

      -   .sm\\\\:prose-sm code[data-prose='true'] {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .sm\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.9em;
      -   }
      -
      -   .sm\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-sm pre[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm ol[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm ul[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm li[data-prose='true'] {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .sm\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .sm\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .sm\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm hr[data-prose='true'] {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .sm\\\\:prose-sm hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm table[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .sm\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-sm > :first-child {
      +   .sm\\\\:markdown > :first-child {

      ---

      -   .sm\\\\:prose-sm > :last-child {
      +   .sm\\\\:markdown > :last-child {

      ---

      -   .sm\\\\:prose-lg {
      +   .sm\\\\:markdown-lg {

      ---

      -   .sm\\\\:prose-lg p[data-prose='true'] {
      +   .sm\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg [class~='lead'] {
      +   .sm\\\\:markdown-lg [class~='lead'] {

      ---

      -   .sm\\\\:prose-lg blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h1[data-prose='true'] {
      +   .sm\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h2[data-prose='true'] {
      +   .sm\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h3[data-prose='true'] {
      +   .sm\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h4[data-prose='true'] {
      +   .sm\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg img[data-prose='true'] {
      +   .sm\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg video[data-prose='true'] {
      +   .sm\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg figure[data-prose='true'] {
      +   .sm\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg code[data-prose='true'] {
      +   .sm\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg pre[data-prose='true'] {
      +   .sm\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ol[data-prose='true'] {
      +   .sm\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg li[data-prose='true'] {
      +   .sm\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg hr[data-prose='true'] {
      +   .sm\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-lg table[data-prose='true'] {
      +   .sm\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-lg > :first-child {
      +   .sm\\\\:markdown-lg > :first-child {

      ---

      -   .sm\\\\:prose-lg > :last-child {
      +   .sm\\\\:markdown-lg > :last-child {

      ---

      -   .sm\\\\:prose-xl {
      +   .sm\\\\:markdown-xl {

      ---

      -   .sm\\\\:prose-xl p[data-prose='true'] {
      +   .sm\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl [class~='lead'] {
      +   .sm\\\\:markdown-xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-xl blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h1[data-prose='true'] {
      +   .sm\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h2[data-prose='true'] {
      +   .sm\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h3[data-prose='true'] {
      +   .sm\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h4[data-prose='true'] {
      +   .sm\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl img[data-prose='true'] {
      +   .sm\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl video[data-prose='true'] {
      +   .sm\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl figure[data-prose='true'] {
      +   .sm\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl code[data-prose='true'] {
      +   .sm\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl pre[data-prose='true'] {
      +   .sm\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ol[data-prose='true'] {
      +   .sm\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl li[data-prose='true'] {
      +   .sm\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl hr[data-prose='true'] {
      +   .sm\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-xl table[data-prose='true'] {
      +   .sm\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-xl > :first-child {
      +   .sm\\\\:markdown-xl > :first-child {

      ---

      -   .sm\\\\:prose-xl > :last-child {
      +   .sm\\\\:markdown-xl > :last-child {

      ---

      -   .sm\\\\:prose-2xl {
      +   .sm\\\\:markdown-2xl {

      ---

      -   .sm\\\\:prose-2xl p[data-prose='true'] {
      +   .sm\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl [class~='lead'] {
      +   .sm\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .sm\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h1[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h2[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h3[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h4[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl img[data-prose='true'] {
      +   .sm\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl video[data-prose='true'] {
      +   .sm\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl figure[data-prose='true'] {
      +   .sm\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .sm\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .sm\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .sm\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl code[data-prose='true'] {
      +   .sm\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .sm\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl pre[data-prose='true'] {
      +   .sm\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ol[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl li[data-prose='true'] {
      +   .sm\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .sm\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .sm\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .sm\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .sm\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .sm\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .sm\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .sm\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl hr[data-prose='true'] {
      +   .sm\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .sm\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .sm\\\\:prose-2xl table[data-prose='true'] {
      +   .sm\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .sm\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .sm\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .sm\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .sm\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .sm\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .sm\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .sm\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .sm\\\\:prose-2xl > :first-child {
      +   .sm\\\\:markdown-2xl > :first-child {

      ---

      -   .sm\\\\:prose-2xl > :last-child {
      +   .sm\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .sm\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;

      ---

      -
      -   .sm\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .sm\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;
      -   }

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose [class~='lead'] {
      +   .md\\\\:markdown [class~='lead'] {

      ---

      -   .md\\\\:prose a[data-prose='true'] {
      +   .md\\\\:markdown a[data-prose='true'] {

      ---

      -   .md\\\\:prose strong[data-prose='true'] {
      +   .md\\\\:markdown strong[data-prose='true'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='A'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='a'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='I'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='i'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .md\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .md\\\\:prose ol[data-prose='true'][type='1'] {
      +   .md\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose hr[data-prose='true'] {
      +   .md\\\\:markdown hr[data-prose='true'] {

      ---

      -   .md\\\\:prose blockquote[data-prose='true'] {
      +   .md\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .md\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .md\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .md\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .md\\\\:prose h1[data-prose='true'] {
      +   .md\\\\:markdown h1[data-prose='true'] {

      ---

      -   .md\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose h2[data-prose='true'] {
      +   .md\\\\:markdown h2[data-prose='true'] {

      ---

      -   .md\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose h3[data-prose='true'] {
      +   .md\\\\:markdown h3[data-prose='true'] {

      ---

      -   .md\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose h4[data-prose='true'] {
      +   .md\\\\:markdown h4[data-prose='true'] {

      ---

      -   .md\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .md\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .md\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose code[data-prose='true'] {
      +   .md\\\\:markdown code[data-prose='true'] {

      ---

      -   .md\\\\:prose code[data-prose='true']::before {
      +   .md\\\\:markdown code[data-prose='true']::before {

      ---

      -   .md\\\\:prose code[data-prose='true']::after {
      +   .md\\\\:markdown code[data-prose='true']::after {

      ---

      -   .md\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose pre[data-prose='true'] {
      +   .md\\\\:markdown pre[data-prose='true'] {

      ---

      -   .md\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .md\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .md\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .md\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .md\\\\:prose table[data-prose='true'] {
      +   .md\\\\:markdown table[data-prose='true'] {

      ---

      -   .md\\\\:prose thead[data-prose='true'] {
      +   .md\\\\:markdown thead[data-prose='true'] {

      ---

      -   .md\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .md\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .md\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose p[data-prose='true'] {
      +   .md\\\\:markdown p[data-prose='true'] {

      ---

      -   .md\\\\:prose img[data-prose='true'] {
      +   .md\\\\:markdown img[data-prose='true'] {

      ---

      -   .md\\\\:prose video[data-prose='true'] {
      +   .md\\\\:markdown video[data-prose='true'] {

      ---

      -   .md\\\\:prose figure[data-prose='true'] {
      +   .md\\\\:markdown figure[data-prose='true'] {

      ---

      -   .md\\\\:prose figure[data-prose='true'] > * {
      +   .md\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose ol[data-prose='true'] {
      +   .md\\\\:markdown ol[data-prose='true'] {

      ---

      -   .md\\\\:prose ul[data-prose='true'] {
      +   .md\\\\:markdown ul[data-prose='true'] {

      ---

      -   .md\\\\:prose li[data-prose='true'] {
      +   .md\\\\:markdown li[data-prose='true'] {

      ---

      -   .md\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .md\\\\:prose-sm p[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-sm blockquote[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .md\\\\:prose-sm h1[data-prose='true'] {
      -     font-size: 2.1428571em;
      +   .md\\\\:markdown hr[data-prose='true'] + * {

      ---

      -     margin-bottom: 0.8em;
      -     line-height: 1.2;

      ---

      -   .md\\\\:prose-sm h2[data-prose='true'] {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .md\\\\:prose-sm h3[data-prose='true'] {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .md\\\\:prose-sm h4[data-prose='true'] {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .md\\\\:prose-sm img[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm video[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm figure[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm figure[data-prose='true'] > * {
      +   .md\\\\:markdown h2[data-prose='true'] + * {

      ---

      -     margin-bottom: 0;

      ---

      -   .md\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .md\\\\:prose-sm code[data-prose='true'] {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .md\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.9em;
      -   }
      -
      -   .md\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-sm pre[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm ol[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm ul[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm li[data-prose='true'] {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .md\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .md\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .md\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm hr[data-prose='true'] {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .md\\\\:prose-sm hr[data-prose='true'] + * {
      +   .md\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-sm h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm h4[data-prose='true'] + * {
      +   .md\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   }
      -
      -   .md\\\\:prose-sm table[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;

      ---

      -   .md\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-sm > :first-child {
      +   .md\\\\:markdown > :first-child {

      ---

      -   .md\\\\:prose-sm > :last-child {
      +   .md\\\\:markdown > :last-child {

      ---

      -   .md\\\\:prose-lg {
      +   .md\\\\:markdown-lg {

      ---

      -   .md\\\\:prose-lg p[data-prose='true'] {
      +   .md\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg [class~='lead'] {
      +   .md\\\\:markdown-lg [class~='lead'] {

      ---

      -   .md\\\\:prose-lg blockquote[data-prose='true'] {
      +   .md\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h1[data-prose='true'] {
      +   .md\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h2[data-prose='true'] {
      +   .md\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h3[data-prose='true'] {
      +   .md\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h4[data-prose='true'] {
      +   .md\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg img[data-prose='true'] {
      +   .md\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg video[data-prose='true'] {
      +   .md\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg figure[data-prose='true'] {
      +   .md\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg figure[data-prose='true'] > * {
      +   .md\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg code[data-prose='true'] {
      +   .md\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg pre[data-prose='true'] {
      +   .md\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ol[data-prose='true'] {
      +   .md\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] {
      +   .md\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg li[data-prose='true'] {
      +   .md\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg hr[data-prose='true'] {
      +   .md\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg hr[data-prose='true'] + * {
      +   .md\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg h2[data-prose='true'] + * {
      +   .md\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg h3[data-prose='true'] + * {
      +   .md\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg h4[data-prose='true'] + * {
      +   .md\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-lg table[data-prose='true'] {
      +   .md\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-lg > :first-child {
      +   .md\\\\:markdown-lg > :first-child {

      ---

      -   .md\\\\:prose-lg > :last-child {
      +   .md\\\\:markdown-lg > :last-child {

      ---

      -   .md\\\\:prose-xl {
      +   .md\\\\:markdown-xl {

      ---

      -   .md\\\\:prose-xl p[data-prose='true'] {
      +   .md\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl [class~='lead'] {
      +   .md\\\\:markdown-xl [class~='lead'] {

      ---

      -   .md\\\\:prose-xl blockquote[data-prose='true'] {
      +   .md\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h1[data-prose='true'] {
      +   .md\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h2[data-prose='true'] {
      +   .md\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h3[data-prose='true'] {
      +   .md\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h4[data-prose='true'] {
      +   .md\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl img[data-prose='true'] {
      +   .md\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl video[data-prose='true'] {
      +   .md\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl figure[data-prose='true'] {
      +   .md\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl figure[data-prose='true'] > * {
      +   .md\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl code[data-prose='true'] {
      +   .md\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl pre[data-prose='true'] {
      +   .md\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ol[data-prose='true'] {
      +   .md\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] {
      +   .md\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl li[data-prose='true'] {
      +   .md\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl hr[data-prose='true'] {
      +   .md\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl hr[data-prose='true'] + * {
      +   .md\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl h2[data-prose='true'] + * {
      +   .md\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl h3[data-prose='true'] + * {
      +   .md\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl h4[data-prose='true'] + * {
      +   .md\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-xl table[data-prose='true'] {
      +   .md\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-xl > :first-child {
      +   .md\\\\:markdown-xl > :first-child {

      ---

      -   .md\\\\:prose-xl > :last-child {
      +   .md\\\\:markdown-xl > :last-child {

      ---

      -   .md\\\\:prose-2xl {
      +   .md\\\\:markdown-2xl {

      ---

      -   .md\\\\:prose-2xl p[data-prose='true'] {
      +   .md\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl [class~='lead'] {
      +   .md\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .md\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .md\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h1[data-prose='true'] {
      +   .md\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h2[data-prose='true'] {
      +   .md\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h3[data-prose='true'] {
      +   .md\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h4[data-prose='true'] {
      +   .md\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl img[data-prose='true'] {
      +   .md\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl video[data-prose='true'] {
      +   .md\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl figure[data-prose='true'] {
      +   .md\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .md\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .md\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .md\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl code[data-prose='true'] {
      +   .md\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .md\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl pre[data-prose='true'] {
      +   .md\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ol[data-prose='true'] {
      +   .md\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl li[data-prose='true'] {
      +   .md\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .md\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .md\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .md\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .md\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .md\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .md\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .md\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl hr[data-prose='true'] {
      +   .md\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .md\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .md\\\\:prose-2xl table[data-prose='true'] {
      +   .md\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .md\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .md\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .md\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .md\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .md\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .md\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .md\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .md\\\\:prose-2xl > :first-child {
      +   .md\\\\:markdown-2xl > :first-child {

      ---

      -   .md\\\\:prose-2xl > :last-child {
      +   .md\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .md\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .md\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose [class~='lead'] {
      +   .lg\\\\:markdown [class~='lead'] {

      ---

      -   .lg\\\\:prose a[data-prose='true'] {
      +   .lg\\\\:markdown a[data-prose='true'] {

      ---

      -   .lg\\\\:prose strong[data-prose='true'] {
      +   .lg\\\\:markdown strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='A'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='a'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='I'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='i'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'][type='1'] {
      +   .lg\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose hr[data-prose='true'] {
      +   .lg\\\\:markdown hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose blockquote[data-prose='true'] {
      +   .lg\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .lg\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .lg\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .lg\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .lg\\\\:prose h1[data-prose='true'] {
      +   .lg\\\\:markdown h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] {
      +   .lg\\\\:markdown h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] {
      +   .lg\\\\:markdown h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose h4[data-prose='true'] {
      +   .lg\\\\:markdown h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .lg\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .lg\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose code[data-prose='true'] {
      +   .lg\\\\:markdown code[data-prose='true'] {

      ---

      -   .lg\\\\:prose code[data-prose='true']::before {
      +   .lg\\\\:markdown code[data-prose='true']::before {

      ---

      -   .lg\\\\:prose code[data-prose='true']::after {
      +   .lg\\\\:markdown code[data-prose='true']::after {

      ---

      -   .lg\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] {
      +   .lg\\\\:markdown pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .lg\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .lg\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .lg\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .lg\\\\:prose table[data-prose='true'] {
      +   .lg\\\\:markdown table[data-prose='true'] {

      ---

      -   .lg\\\\:prose thead[data-prose='true'] {
      +   .lg\\\\:markdown thead[data-prose='true'] {

      ---

      -   .lg\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .lg\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .lg\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose p[data-prose='true'] {
      +   .lg\\\\:markdown p[data-prose='true'] {

      ---

      -   .lg\\\\:prose img[data-prose='true'] {
      +   .lg\\\\:markdown img[data-prose='true'] {

      ---

      -   .lg\\\\:prose video[data-prose='true'] {
      +   .lg\\\\:markdown video[data-prose='true'] {

      ---

      -   .lg\\\\:prose figure[data-prose='true'] {
      +   .lg\\\\:markdown figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose figure[data-prose='true'] > * {
      +   .lg\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose ol[data-prose='true'] {
      +   .lg\\\\:markdown ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] {
      +   .lg\\\\:markdown ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose li[data-prose='true'] {
      +   .lg\\\\:markdown li[data-prose='true'] {

      ---

      -   .lg\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   }
      -
      -   .lg\\\\:prose hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose h2[data-prose='true'] + * {
      -     margin-top: 0;

      ---

      -   .lg\\\\:prose h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .lg\\\\:prose-sm p[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-sm blockquote[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .lg\\\\:prose-sm h1[data-prose='true'] {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .lg\\\\:prose-sm h2[data-prose='true'] {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .lg\\\\:prose-sm h3[data-prose='true'] {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .lg\\\\:prose-sm h4[data-prose='true'] {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .lg\\\\:prose-sm img[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm video[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm figure[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm figure[data-prose='true'] > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .lg\\\\:prose-sm code[data-prose='true'] {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .lg\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.9em;
      -   }
      -
      -   .lg\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-sm pre[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm ol[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm ul[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm li[data-prose='true'] {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .lg\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .lg\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .lg\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm hr[data-prose='true'] {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .lg\\\\:prose-sm hr[data-prose='true'] + * {
      +   .lg\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm h2[data-prose='true'] + * {
      +   .lg\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm h3[data-prose='true'] + * {
      +   .lg\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm h4[data-prose='true'] + * {
      +   .lg\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-sm table[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .lg\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-sm > :first-child {
      +   .lg\\\\:markdown > :first-child {

      ---

      -   .lg\\\\:prose-sm > :last-child {
      +   .lg\\\\:markdown > :last-child {

      ---

      -   .lg\\\\:prose-lg {
      +   .lg\\\\:markdown-lg {

      ---

      -   .lg\\\\:prose-lg p[data-prose='true'] {
      +   .lg\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg [class~='lead'] {
      +   .lg\\\\:markdown-lg [class~='lead'] {

      ---

      -   .lg\\\\:prose-lg blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h1[data-prose='true'] {
      +   .lg\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h2[data-prose='true'] {
      +   .lg\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h3[data-prose='true'] {
      +   .lg\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h4[data-prose='true'] {
      +   .lg\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg img[data-prose='true'] {
      +   .lg\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg video[data-prose='true'] {
      +   .lg\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg figure[data-prose='true'] {
      +   .lg\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg code[data-prose='true'] {
      +   .lg\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg pre[data-prose='true'] {
      +   .lg\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ol[data-prose='true'] {
      +   .lg\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg li[data-prose='true'] {
      +   .lg\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg hr[data-prose='true'] {
      +   .lg\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-lg table[data-prose='true'] {
      +   .lg\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-lg > :first-child {
      +   .lg\\\\:markdown-lg > :first-child {

      ---

      -   .lg\\\\:prose-lg > :last-child {
      +   .lg\\\\:markdown-lg > :last-child {

      ---

      -   .lg\\\\:prose-xl {
      +   .lg\\\\:markdown-xl {

      ---

      -   .lg\\\\:prose-xl p[data-prose='true'] {
      +   .lg\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl [class~='lead'] {
      +   .lg\\\\:markdown-xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-xl blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h1[data-prose='true'] {
      +   .lg\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h2[data-prose='true'] {
      +   .lg\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h3[data-prose='true'] {
      +   .lg\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h4[data-prose='true'] {
      +   .lg\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl img[data-prose='true'] {
      +   .lg\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl video[data-prose='true'] {
      +   .lg\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl figure[data-prose='true'] {
      +   .lg\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl code[data-prose='true'] {
      +   .lg\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl pre[data-prose='true'] {
      +   .lg\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ol[data-prose='true'] {
      +   .lg\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl li[data-prose='true'] {
      +   .lg\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl hr[data-prose='true'] {
      +   .lg\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-xl table[data-prose='true'] {
      +   .lg\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-xl > :first-child {
      +   .lg\\\\:markdown-xl > :first-child {

      ---

      -   .lg\\\\:prose-xl > :last-child {
      +   .lg\\\\:markdown-xl > :last-child {

      ---

      -   .lg\\\\:prose-2xl {
      +   .lg\\\\:markdown-2xl {

      ---

      -   .lg\\\\:prose-2xl p[data-prose='true'] {
      +   .lg\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl [class~='lead'] {
      +   .lg\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .lg\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h1[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h2[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h3[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h4[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl img[data-prose='true'] {
      +   .lg\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl video[data-prose='true'] {
      +   .lg\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl figure[data-prose='true'] {
      +   .lg\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .lg\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .lg\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .lg\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl code[data-prose='true'] {
      +   .lg\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .lg\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl pre[data-prose='true'] {
      +   .lg\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ol[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl li[data-prose='true'] {
      +   .lg\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .lg\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .lg\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .lg\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .lg\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .lg\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .lg\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .lg\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl hr[data-prose='true'] {
      +   .lg\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .lg\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .lg\\\\:prose-2xl table[data-prose='true'] {
      +   .lg\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .lg\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .lg\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .lg\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .lg\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .lg\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .lg\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .lg\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .lg\\\\:prose-2xl > :first-child {
      +   .lg\\\\:markdown-2xl > :first-child {

      ---

      -   .lg\\\\:prose-2xl > :last-child {
      +   .lg\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .lg\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;

      ---

      -
      -   .lg\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .lg\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;
      -   }

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose [class~='lead'] {
      +   .xl\\\\:markdown [class~='lead'] {

      ---

      -   .xl\\\\:prose a[data-prose='true'] {
      +   .xl\\\\:markdown a[data-prose='true'] {

      ---

      -   .xl\\\\:prose strong[data-prose='true'] {
      +   .xl\\\\:markdown strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='A'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='a'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='I'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='i'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'][type='1'] {
      +   .xl\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose hr[data-prose='true'] {
      +   .xl\\\\:markdown hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose blockquote[data-prose='true'] {
      +   .xl\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .xl\\\\:prose h1[data-prose='true'] {
      +   .xl\\\\:markdown h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] {
      +   .xl\\\\:markdown h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] {
      +   .xl\\\\:markdown h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose h4[data-prose='true'] {
      +   .xl\\\\:markdown h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .xl\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .xl\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose code[data-prose='true'] {
      +   .xl\\\\:markdown code[data-prose='true'] {

      ---

      -   .xl\\\\:prose code[data-prose='true']::before {
      +   .xl\\\\:markdown code[data-prose='true']::before {

      ---

      -   .xl\\\\:prose code[data-prose='true']::after {
      +   .xl\\\\:markdown code[data-prose='true']::after {

      ---

      -   .xl\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] {
      +   .xl\\\\:markdown pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .xl\\\\:prose table[data-prose='true'] {
      +   .xl\\\\:markdown table[data-prose='true'] {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] {
      +   .xl\\\\:markdown thead[data-prose='true'] {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose p[data-prose='true'] {
      +   .xl\\\\:markdown p[data-prose='true'] {

      ---

      -   .xl\\\\:prose img[data-prose='true'] {
      +   .xl\\\\:markdown img[data-prose='true'] {

      ---

      -   .xl\\\\:prose video[data-prose='true'] {
      +   .xl\\\\:markdown video[data-prose='true'] {

      ---

      -   .xl\\\\:prose figure[data-prose='true'] {
      +   .xl\\\\:markdown figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose figure[data-prose='true'] > * {
      +   .xl\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose ol[data-prose='true'] {
      +   .xl\\\\:markdown ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] {
      +   .xl\\\\:markdown ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose li[data-prose='true'] {
      +   .xl\\\\:markdown li[data-prose='true'] {

      ---

      -   .xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose hr[data-prose='true'] + * {
      +   .xl\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose h2[data-prose='true'] + * {
      +   .xl\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose h3[data-prose='true'] + * {
      +   .xl\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose h4[data-prose='true'] + * {
      +   .xl\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose > :first-child {
      +   .xl\\\\:markdown > :first-child {

      ---

      -   .xl\\\\:prose > :last-child {
      +   .xl\\\\:markdown > :last-child {

      ---

      -   .xl\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .xl\\\\:prose-sm p[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-sm blockquote[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .xl\\\\:prose-sm h1[data-prose='true'] {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .xl\\\\:prose-sm h2[data-prose='true'] {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .xl\\\\:prose-sm h3[data-prose='true'] {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .xl\\\\:prose-sm h4[data-prose='true'] {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .xl\\\\:prose-sm img[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm video[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm figure[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm figure[data-prose='true'] > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .xl\\\\:prose-sm code[data-prose='true'] {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .xl\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.9em;
      -   }
      -
      -   .xl\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-sm pre[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm ol[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm ul[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm li[data-prose='true'] {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm hr[data-prose='true'] {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .xl\\\\:prose-sm hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm table[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-sm > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-lg {
      +   .xl\\\\:markdown-lg {

      ---

      -   .xl\\\\:prose-lg p[data-prose='true'] {
      +   .xl\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg [class~='lead'] {
      +   .xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .xl\\\\:prose-lg blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h1[data-prose='true'] {
      +   .xl\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h2[data-prose='true'] {
      +   .xl\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h3[data-prose='true'] {
      +   .xl\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h4[data-prose='true'] {
      +   .xl\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg img[data-prose='true'] {
      +   .xl\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg video[data-prose='true'] {
      +   .xl\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg figure[data-prose='true'] {
      +   .xl\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg code[data-prose='true'] {
      +   .xl\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg pre[data-prose='true'] {
      +   .xl\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ol[data-prose='true'] {
      +   .xl\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg li[data-prose='true'] {
      +   .xl\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg hr[data-prose='true'] {
      +   .xl\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-lg table[data-prose='true'] {
      +   .xl\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-lg > :first-child {
      +   .xl\\\\:markdown-lg > :first-child {

      ---

      -   .xl\\\\:prose-lg > :last-child {
      +   .xl\\\\:markdown-lg > :last-child {

      ---

      -   .xl\\\\:prose-xl {
      +   .xl\\\\:markdown-xl {

      ---

      -   .xl\\\\:prose-xl p[data-prose='true'] {
      +   .xl\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl [class~='lead'] {
      +   .xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-xl blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h1[data-prose='true'] {
      +   .xl\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h2[data-prose='true'] {
      +   .xl\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h3[data-prose='true'] {
      +   .xl\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h4[data-prose='true'] {
      +   .xl\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl img[data-prose='true'] {
      +   .xl\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl video[data-prose='true'] {
      +   .xl\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl figure[data-prose='true'] {
      +   .xl\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl code[data-prose='true'] {
      +   .xl\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl pre[data-prose='true'] {
      +   .xl\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ol[data-prose='true'] {
      +   .xl\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl li[data-prose='true'] {
      +   .xl\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl hr[data-prose='true'] {
      +   .xl\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-xl table[data-prose='true'] {
      +   .xl\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-xl > :first-child {
      +   .xl\\\\:markdown-xl > :first-child {

      ---

      -   .xl\\\\:prose-xl > :last-child {
      +   .xl\\\\:markdown-xl > :last-child {

      ---

      -   .xl\\\\:prose-2xl {
      +   .xl\\\\:markdown-2xl {

      ---

      -   .xl\\\\:prose-2xl p[data-prose='true'] {
      +   .xl\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl [class~='lead'] {
      +   .xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .xl\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h1[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h2[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h3[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h4[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl img[data-prose='true'] {
      +   .xl\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl video[data-prose='true'] {
      +   .xl\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl figure[data-prose='true'] {
      +   .xl\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .xl\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .xl\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .xl\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl code[data-prose='true'] {
      +   .xl\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .xl\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl pre[data-prose='true'] {
      +   .xl\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ol[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl li[data-prose='true'] {
      +   .xl\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .xl\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .xl\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .xl\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .xl\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl hr[data-prose='true'] {
      +   .xl\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .xl\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .xl\\\\:prose-2xl table[data-prose='true'] {
      +   .xl\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .xl\\\\:prose-2xl > :first-child {
      +   .xl\\\\:markdown-2xl > :first-child {

      ---

      -   .xl\\\\:prose-2xl > :last-child {
      +   .xl\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .xl\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;

      ---

      -
      -   .xl\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;
      -   }

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose [class~='lead'] {
      +   .\\\\32xl\\\\:markdown [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose a[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown a[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='A'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='A'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='a'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='a'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='A' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='A' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='a' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='a' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='I'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='I'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='i'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='i'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='I' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='I' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='i' s] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='i' s] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'][type='1'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'][type='1'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {
      +   .\\\\32xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:first-of-type::before {

      ---

      -   .\\\\32xl\\\\:prose blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {
      +   .\\\\32xl\\\\:markdown blockquote[data-prose='true'] p[data-prose='true']:last-of-type::after {

      ---

      -   .\\\\32xl\\\\:prose h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h1[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h1[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h4[data-prose='true'] strong[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h4[data-prose='true'] strong[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose code[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown code[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose code[data-prose='true']::after {
      +   .\\\\32xl\\\\:markdown code[data-prose='true']::after {

      ---

      -   .\\\\32xl\\\\:prose a[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown a[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose pre[data-prose='true'] code[data-prose='true']::after {
      +   .\\\\32xl\\\\:markdown pre[data-prose='true'] code[data-prose='true']::after {

      ---

      -   .\\\\32xl\\\\:prose table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] tr[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] tr[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose > :first-child {
      +   .\\\\32xl\\\\:markdown > :first-child {

      ---

      -   .\\\\32xl\\\\:prose > :last-child {
      +   .\\\\32xl\\\\:markdown > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm p[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm blockquote[data-prose='true'] {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h1[data-prose='true'] {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h2[data-prose='true'] {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h3[data-prose='true'] {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h4[data-prose='true'] {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm img[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm video[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm figure[data-prose='true'] {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm figure[data-prose='true'] > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm figure[data-prose='true'] figcaption[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm code[data-prose='true'] {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h2[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.9em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h3[data-prose='true'] code[data-prose='true'] {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm pre[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ol[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm li[data-prose='true'] {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ol[data-prose='true'] > li[data-prose='true']::before {
      -     left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true'] {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] > li[data-prose='true']::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-sm ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-sm ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-sm ol[data-prose='true'] ol[data-prose='true'] {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm hr[data-prose='true'] {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm hr[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h2[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h3[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h4[data-prose='true'] + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm table[data-prose='true'] {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true'] {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm thead[data-prose='true'] th[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true'] {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm tbody[data-prose='true'] td[data-prose='true']:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-lg {
      +   .\\\\32xl\\\\:markdown-lg {

      ---

      -   .\\\\32xl\\\\:prose-lg p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-lg blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-lg figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-lg figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-lg ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-lg ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-lg ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-lg ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-lg ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-lg h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-lg table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-lg thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-lg tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :first-child {
      +   .\\\\32xl\\\\:markdown-lg > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :last-child {
      +   .\\\\32xl\\\\:markdown-lg > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl {
      +   .\\\\32xl\\\\:markdown-xl {

      ---

      -   .\\\\32xl\\\\:prose-xl p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-xl blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-xl figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-xl h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-xl table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :first-child {
      +   .\\\\32xl\\\\:markdown-xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :last-child {
      +   .\\\\32xl\\\\:markdown-xl > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl {
      +   .\\\\32xl\\\\:markdown-2xl {

      ---

      -   .\\\\32xl\\\\:prose-2xl p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl blockquote[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl blockquote[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h1[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h1[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h2[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h3[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h4[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl img[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl img[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl video[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl video[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl figure[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] > * {
      +   .\\\\32xl\\\\:markdown-2xl figure[data-prose='true'] > * {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure[data-prose='true'] figcaption[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl figure[data-prose='true'] figcaption[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h2[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] code[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl h3[data-prose='true'] code[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl pre[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl pre[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] > li[data-prose='true']::before {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] > li[data-prose='true']::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] p[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol[data-prose='true'] > li[data-prose='true'] > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-2xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:prose-2xl ol[data-prose='true'] ol[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-2xl ul[data-prose='true'] ol[data-prose='true'], .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] ul[data-prose='true'], .\\\\32xl\\\\:markdown-2xl ol[data-prose='true'] ol[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl hr[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl hr[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl h2[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl h3[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4[data-prose='true'] + * {
      +   .\\\\32xl\\\\:markdown-2xl h4[data-prose='true'] + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl table[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl table[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead[data-prose='true'] th[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-2xl thead[data-prose='true'] th[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true'] {
      +   .\\\\32xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody[data-prose='true'] td[data-prose='true']:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :first-child {
      +   .\\\\32xl\\\\:markdown-2xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :last-child {
      +   .\\\\32xl\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-red a[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red a[data-prose='true'] code[data-prose='true'] {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a[data-prose='true'] code[data-prose='true'] {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a[data-prose='true'] code[data-prose='true'] {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a[data-prose='true'] code[data-prose='true'] {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a[data-prose='true'] code[data-prose='true'] {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a[data-prose='true'] code[data-prose='true'] {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a[data-prose='true'] {
      -     color: #db2777;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a[data-prose='true'] code[data-prose='true'] {
      -     color: #db2777;

    "
  `)
})

it('should be possible to add a new variant', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              dark: {
                css: [{ color: 'black', maxWidth: '65ch' }],
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose-dark {
      +   color: black;
      +   max-width: 65ch;
      + }
      +

      ---

      +
      +   .sm\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;
      +   }

      ---

      +   }
      +
      +   .md\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

      ---

      +   }
      +
      +   .lg\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

      ---

      +   }
      +
      +   .xl\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

    "
  `)
})

it('should be possible to merge values', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              DEFAULT: {
                css: [{ a: { backgroundColor: 'red' } }, { a: { color: 'green' } }],
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose a {
      +   background-color: red;
      +   color: green;
      + }
      +

      ---

      +   .sm\\\\:prose a {
      +     background-color: red;
      +     color: green;
      +   }
      +

      ---

      +   }
      +
      +   .md\\\\:prose a {
      +     background-color: red;
      +     color: green;

      ---

      +   }
      +
      +   .lg\\\\:prose a {
      +     background-color: red;
      +     color: green;

      ---

      +   }
      +
      +   .xl\\\\:prose a {
      +     background-color: red;
      +     color: green;

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose a {
      +     background-color: red;
      +     color: green;

    "
  `)
})

it('should be possible to only update a single value from an existing definition', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              DEFAULT: {
                css: {
                  blockquote: {
                    fontWeight: '600',
                  },
                },
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose blockquote {
      +   font-weight: 600;
      + }
      +

      ---

      +   }
      +
      +   .sm\\\\:prose blockquote {
      +     font-weight: 600;

      ---

      +   }
      +
      +   .md\\\\:prose blockquote {
      +     font-weight: 600;

      ---

      +   }
      +
      +   .lg\\\\:prose blockquote {
      +     font-weight: 600;

      ---

      +   .xl\\\\:prose blockquote {
      +     font-weight: 600;
      +   }
      +

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose blockquote {
      +     font-weight: 600;

    "
  `)
})

it('should be possible to only update a single value from a different modifier', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              sm: {
                css: {
                  blockquote: {
                    fontWeight: '600',
                  },
                },
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose-sm blockquote {
      +   font-weight: 600;
      + }
      +

      ---

      +   }
      +
      +   .sm\\\\:prose-sm blockquote {
      +     font-weight: 600;

      ---

      +   }
      +
      +   .md\\\\:prose-sm blockquote {
      +     font-weight: 600;

      ---

      +   }
      +
      +   .lg\\\\:prose-sm blockquote {
      +     font-weight: 600;

      ---

      +   .xl\\\\:prose-sm blockquote {
      +     font-weight: 600;
      +   }
      +

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose-sm blockquote {
      +     font-weight: 600;

    "
  `)
})

it('should be possible to override backticks for the inline `code` tag', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              DEFAULT: {
                css: [
                  {
                    'code::before': {
                      content: '""',
                    },
                    'code::after': {
                      content: '""',
                    },
                  },
                ],
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose code::before {
      +   content: '';
      + }
      +
      + .prose code::after {
      +   content: '';
      + }
      +

      ---

      +   }
      +
      +   .sm\\\\:prose code::before {
      +     content: '';
      +   }
      +
      +   .sm\\\\:prose code::after {
      +     content: '';

      ---

      +   }
      +
      +   .md\\\\:prose code::before {
      +     content: '';
      +   }
      +
      +   .md\\\\:prose code::after {
      +     content: '';

      ---

      +   }
      +
      +   .lg\\\\:prose code::before {
      +     content: '';

      ---

      +   .lg\\\\:prose code::after {
      +     content: '';
      +   }
      +

      ---

      +   }
      +
      +   .xl\\\\:prose code::before {
      +     content: '';

      ---

      +   .xl\\\\:prose code::after {
      +     content: '';
      +   }
      +

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose code::before {
      +     content: '';
      +   }
      +
      +   .\\\\32xl\\\\:prose code::after {
      +     content: '';

    "
  `)
})

it('should be possible to add colors without 600 and still get default and custom prose color helpers created', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            colors: {
              'darkish-red': '#a85555',
              'darkish-green': {
                600: '#55a855',
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose-darkish-green a[data-prose='true'] {
      +   color: #55a855;
      + }
      +
      + .prose-darkish-green a[data-prose='true'] code[data-prose='true'] {
      +   color: #55a855;
      + }
      +

      ---

      +   }
      +
      +   .sm\\\\:prose-darkish-green a[data-prose='true'] {
      +     color: #55a855;
      +   }
      +
      +   .sm\\\\:prose-darkish-green a[data-prose='true'] code[data-prose='true'] {
      +     color: #55a855;

      ---

      +   }
      +
      +   .md\\\\:prose-darkish-green a[data-prose='true'] {
      +     color: #55a855;
      +   }
      +
      +   .md\\\\:prose-darkish-green a[data-prose='true'] code[data-prose='true'] {
      +     color: #55a855;

      ---

      +   }
      +
      +   .lg\\\\:prose-darkish-green a[data-prose='true'] {
      +     color: #55a855;

      ---

      +
      +   .lg\\\\:prose-darkish-green a[data-prose='true'] code[data-prose='true'] {
      +     color: #55a855;
      +   }

      ---

      +   }
      +
      +   .xl\\\\:prose-darkish-green a[data-prose='true'] {
      +     color: #55a855;

      ---

      +
      +   .xl\\\\:prose-darkish-green a[data-prose='true'] code[data-prose='true'] {
      +     color: #55a855;
      +   }

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose-darkish-green a[data-prose='true'] {
      +     color: #55a855;
      +   }
      +
      +   .\\\\32xl\\\\:prose-darkish-green a[data-prose='true'] code[data-prose='true'] {
      +     color: #55a855;

    "
  `)
})
