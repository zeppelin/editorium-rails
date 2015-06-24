require 'react-rails'
require 'editorium/version'
require 'editorium/config'
require 'editorium/rails'
require 'editorium/helper'

ActionView::Base.send :include, Editorium::Helper
