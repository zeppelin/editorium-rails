module Editorium
  module Helper
    include ActionView::Helpers::FormHelper
    include ActionView::Helpers::SanitizeHelper

    def editorium_input(object_name, method, options = {})
      base_id = "#{object_name}_#{method}"
      service_url = Editorium.try(:configuration).try(:service_url) || 'http://localhost:4200'

      react_component 'EditoriumInput', {
        prerender: true,

        objectName: object_name,
        method: method,
        value: (options[:value] || ''),
        serviceURL: service_url
      }
    end

    def render_editorium(json)
      return  if json.nil?
      json = JSON.parse(json)  if json.is_a?(String)

      buffer = "".html_safe

      json["list"].each do |widget_source|
        widget = RecursiveOpenStruct.new(widget_source)
        next  unless lookup_context.template_exists?("editorium/_#{widget.type}")

        buffer << render("editorium/#{widget.type}", layout: false, data: widget.data)
      end

      buffer
    end
  end
end
