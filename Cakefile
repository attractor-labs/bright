fs         = require 'fs'
{exec}     = require 'child_process'
compressor = require 'node-minify'
util       = require 'util'

#
# Build / Package Rules & Targets
#

css_dependencies = [
  "css/bright.css",
  "css/something.css"
]

js_dependencies = [
  "src/reader.js",
  "src/axis.js",
  "src/scales.js",
  "src/builder.js",
  "src/canvas.js",
  "src/stacked_area.js",
  "src/bright.js"
]

#
# Utilities & Eventing
#

events = {}

after = (name, fn) ->
  events[name] ?= []
  events[name].push fn

chain = (list, callback) ->
  return unless list? and list.length
  for i in [0..list.length-2]
    [cause, effect] = [list[i], list[i+1]]
    after cause, ((task) -> -> invoke task)(effect)
  after list[list.length-1], -> callback() if callback?
  invoke list[0]

all = (list, callback) ->
  return unless list? and list.length
  count = list.length
  for task in list
    after task, -> callback() unless (--count) or !callback?
    invoke task

done = (name) ->
  return unless events[name]?
  fn() for fn in events[name]

stripSlash = (name) ->
  name.replace /\/\s*$/, ''

error = (task, msg) ->
  util.log "[ERROR] Task '#{task}':\n  #{msg}"

watch = (dir, ext, fn) ->
  stampName = ".stamp_#{stripSlash(dir)+ext}"

  watchFiles = (err, stdout, stderr) ->
    return error("watch(#{dir})", stderr) if err?
    for file in stdout.split /\s+/
      continue unless file.match ext
      fs.watch file, ((file) -> (event) -> fn(event, file))(file)
    exec "touch #{stampName}"

  fs.watch dir, -> exec "find #{stripSlash(dir)} -newer #{stampName}", watchFiles
  exec "find #{stripSlash(dir)}", watchFiles

#
# Tasks
#

task 'compile', 'Builds one minified JavaScript from sources', ->
  console.log "Compiling..."
  new compressor.minify
    type: "gcc"
    fileIn: js_dependencies
    fileOut: "bright.min.js"
    callback: (err, min) ->
      if err
        console.log err
      else
        console.log "...done!"
        done 'compile'

task 'merge', 'Merge JavaScript from sources into one', ->
  console.log "Merging..."
  new compressor.minify
    type: "no-compress"
    fileIn: js_dependencies
    fileOut: "bright.dev.js"
    callback: (err, min) ->
      if err
        console.log err
      else
        console.log "...done!"
        done 'merge'

task 'css', 'Clean CSS', ->
  console.log "Preparing CSS..."
  new compressor.minify
    type: 'clean-css'
    fileIn: ['css/bright.css', 'css/something.css']
    fileOut: 'bright.min.css'
    callback: (err, min) ->
      if err
        console.log err
      else
        console.log "...done!"
        done 'css'

task 'test', 'Runs unit tests', ->
  after 'merge', ->
    console.log "Testing..."
    exec "./node_modules/.bin/mocha --recursive tests/unit/", (err, stdout, stderr) ->
      console.log stderr + stdout
  invoke 'merge'