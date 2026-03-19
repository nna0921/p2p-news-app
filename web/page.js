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

async function init_blog ({ username }) {
}

async function get_peer_blogs () {
  return new Map()
}

async function get_my_posts () {
  return []
}

async function get_profile (key) {
  return null
}

function on_update (callback) {
}

async function init () {
  const start = await sdb.watch(handle_watch_batch)

  async function handle_watch_batch (batch) {
  }

  if (!start || start.length === 0) return

  const news_instance = start[0]
  const { sid } = news_instance

  const app = await news_app({ sid, vault: custom_vault })
  document.body.append(app)
}

init().catch(console.error)

function fallback_module () {
  return {
    _: {
      news_app: {
        $: '',
        mapping: {
          entries: 'entries',
          theme: 'theme',
          runtime: 'runtime',
          mode: 'mode',
          flags: 'flags',
          keybinds: 'keybinds',
          undo: 'undo',
          my_stories: 'my_stories',
          feeds: 'feeds',
          lists: 'lists',
          discover: 'discover'
        }
      }
    },
    drive: {
      'entries/': { 'entries.json': { $ref: 'node_modules/graph_explorer_impl/entries.json' } },
      'theme/': {
        'layout.css': { $ref: 'node_modules/graph_explorer_impl/layout.css' },
        'news_card.css': { $ref: 'node_modules/news_cards/news-card.css' }
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
      'mode/': { 'current_mode.json': { raw: '"menubar"' } },
      'flags/': {
        'hubs.json': { raw: '"default"' },
        'selection.json': { raw: 'true' },
        'recursive_collapse.json': { raw: 'true' }
      },
      'keybinds/': { 'navigation.json': { raw: '{}' } },
      'undo/': { 'stack.json': { raw: '[]' } },
      'my_stories/': {
        story_1: { $ref: 'node_modules/news_app/data/story_1.md' },
        story_2: { $ref: 'node_modules/news_app/data/story_2.md' },
        story_3: { $ref: 'node_modules/news_app/data/story_3.md' },
        story_4: { $ref: 'node_modules/news_app/data/story_4.md' }
      },
      'feeds/': {
        code_coffee: { $ref: 'node_modules/news_app/data/code_coffee.md' },
        system_design: { $ref: 'node_modules/news_app/data/system_design.md' },
        mesh_network: { $ref: 'node_modules/news_app/data/mesh_network.md' },
        fediverse: { $ref: 'node_modules/news_app/data/fediverse.md' },
        self_hosting: { $ref: 'node_modules/news_app/data/self_hosting.md' },
        network_notes: { $ref: 'node_modules/news_app/data/network_notes.md' },
        privacy_matters: { $ref: 'node_modules/news_app/data/privacy_matters.md' },
        zero_trust: { $ref: 'node_modules/news_app/data/zero_trust.md' }
      },
      'lists/': {
        best_of_tech: { $ref: 'node_modules/news_app/data/best_of_tech.md' },
        morning_read: { $ref: 'node_modules/news_app/data/morning_read.md' }
      },
      'discover/': {
        random_peer_99: { raw: '{}' },
        satoshi_fan: { raw: '{}' },
        rust_evangelist: { raw: '{}' }
      }
    }
  }
}
