# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'editorium/version'

Gem::Specification.new do |spec|
  spec.name          = "editorium"
  spec.version       = Editorium::VERSION
  spec.authors       = ["Gabor Babicz"]
  spec.email         = ["gabor.babicz@gmail.com"]
  spec.summary       = %q{Will fill out later.}
  spec.description   = %q{Will fill out later.}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec"

  spec.add_dependency "react-rails"
  spec.add_dependency "railties"
end
