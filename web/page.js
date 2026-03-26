localStorage.clear()
const STATE = require('STATE')
const statedb = STATE(__filename)
statedb.admin()

const { sdb } = statedb(fallback_module)

const news_app = require('news_app')

const custom_vault = {
  init_blog: init_blog,
  get_peer_blogs: get_peer_blogs,
  get_my_posts: get_my_posts,
  get_profile: get_profile,
  on_update: on_update
}

async function init_blog ({ username }) {}
async function get_peer_blogs () { return new Map() }
async function get_my_posts () { return [] }
async function get_profile (key) { return null }
function on_update (callback) {}

async function init () {
  const start = await sdb.watch(handle_watch_batch)
  async function handle_watch_batch (batch) {}

  if (!start || start.length === 0) {
    console.error('[page.js] No instances found in sdb.watch!')
    return
  }

  const news_instance = start[0]

  if (!news_instance) {
    console.error('[page.js] Failed to find news_app instance!')
    return
  }

  const { sid } = news_instance

  const app = await news_app({ sid, vault: custom_vault })
  document.body.append(app)
}

init().catch(ignore_error)

function ignore_error (err) {
  console.error('[page.js] Init failed:', err)
}

function fallback_module () {
  const drive = {
    'entries/': { 'entries.json': { $ref: 'node_modules/news_app/entries.json' } },
    'theme/': {
      'layout.css': { $ref: 'node_modules/news_app/layout.css' },
      'news-card.css': { $ref: 'node_modules/news_cards/news-card.css' },
      'style.css': { $ref: 'node_modules/news_app/style.css' }
    },
    'runtime/': {
      'node_height.json': { raw: '32' },
      'vertical_scroll_value.json': { raw: '0' },
      'horizontal_scroll_value.json': { raw: '0' },
      'selected_instance_paths.json': { raw: '[]' },
      'confirmed_selected.json': { raw: '[]' },
      'instance_states.json': { raw: '{}' },
      'search_entry_states.json': { raw: '{}' },
      'last_clicked_node.json': { raw: 'null' },
      'view_order_tracking.json': { raw: '{}' }
    },
    'mode/': {
      'current_mode.json': { raw: '"menubar"' },
      'previous_mode.json': { raw: '"menubar"' },
      'search_query.json': { raw: '""' },
      'multi_select_enabled.json': { raw: 'false' },
      'select_between_enabled.json': { raw: 'false' }
    },
    'flags/': {
      'hubs.json': { raw: '"default"' },
      'selection.json': { raw: 'true' },
      'recursive_collapse.json': { raw: 'true' }
    },
    'keybinds/': { 'navigation.json': { raw: '{}' } },
    'undo/': { 'stack.json': { raw: '[]' } },
    'my-stories/': {
      'story-1': { $ref: 'node_modules/news_app/data/story-1.md' },
      'story-2': { $ref: 'node_modules/news_app/data/story-2.md' },
      'story-3': { $ref: 'node_modules/news_app/data/story-3.md' },
      'story-4': { $ref: 'node_modules/news_app/data/story-4.md' }
    },
    'feeds/hackers-digest/': {
      'code-coffee': { $ref: 'node_modules/news_app/data/code-coffee.md' },
      'system-design': { $ref: 'node_modules/news_app/data/system-design.md' }
    },
    'feeds/off-the-grid/': {
      'mesh-network': { $ref: 'node_modules/news_app/data/mesh-network.md' },
      fediverse: { $ref: 'node_modules/news_app/data/fediverse.md' },
      'self-hosting': { $ref: 'node_modules/news_app/data/self-hosting.md' }
    },
    'feeds/peer-review/': {
      'network-notes': { $ref: 'node_modules/news_app/data/network-notes.md' }
    },
    'feeds/peer-review/security-chronicles/': {
      'privacy-matters': { $ref: 'node_modules/news_app/data/privacy-matters.md' },
      'zero-trust': { $ref: 'node_modules/news_app/data/zero-trust.md' }
    },
    'lists/best-of-tech': { $ref: 'node_modules/news_app/data/best-of-tech.md' },
    'lists/morning-read': { $ref: 'node_modules/news_app/data/morning-read.md' },
    'discover/random-peer-99/': {},
    'discover/satoshi-fan/': {},
    'discover/rust-evangelist/': {},
    '_/': {
      '0.json': { raw: '{"module": "news_app"}' }
    }
  }

  return {
    _: {
      news_app: {
        $: '',
        0: '',
        mapping: {
          entries: 'entries',
          theme: 'theme',
          runtime: 'runtime',
          mode: 'mode',
          flags: 'flags',
          keybinds: 'keybinds',
          undo: 'undo',
          'my-stories': 'my-stories',
          feeds: 'feeds',
          lists: 'lists',
          discover: 'discover',
          _: '_'
        }
      }
    },
    drive
  }
}
