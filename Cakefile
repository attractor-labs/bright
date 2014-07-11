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
  "src/another.js",
  "src/jquery.js"
]

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