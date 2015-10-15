# Editorium

TODO: Write a gem description

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'editorium', github: 'zeppelin/editorium-ruby'
```

And then execute:

    $ bundle

## Usage

Configure the editor service URL:

```rb
# config/initializers/editorium.rb

Editorium.configure do |config|
  config.service_url = "http://editorium.herokuapp.com"
end
```

Then use the helper inside your views:

```erb
<%=
  editorium_input :post, :body,
    value: @post.body,
    source: @post.body_source
%>
```

Where:

- `:object_name` is the name of the ActiveRecord model.
- `:method_name` is the name of the attribute.
- `:value` is the rendered HTML.
- `:source` is the JSON source the editor can handle.

Note that the attribute naming for the source field must be `<method>_source`,
so when you have `main_text` to hold the rendered HTML, there must be a
`main_text_source` to store the JSON source for the editor.

*This may change in the future, for now it does the job*

## Contributing

1. Fork it ( https://github.com/[my-github-username]/editorium/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
