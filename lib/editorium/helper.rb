module Editorium
  module Helper
    include ActionView::Helpers::FormHelper
    include ActionView::Helpers::SanitizeHelper

    def editorium_input(object_name, method, options = {})
      base_id = "#{object_name}_#{method}"
      service_url = Editorium.try(:configuration).service_url

      react_component('EditoriumInput', {
        objectName: object_name,
        method: method,
        value: (options[:value] || ''),
        fieldName: (options[:field_name] || ''),
        serviceURL: service_url,
        previewEndpoint: options[:preview_endpoint],
        editoriumId: (options[:editorium_id] || ''),
        config: {
          title: options[:title]
        }
      }, {
        prerender: true
      })
    end

    def render_editorium(json)
      return  if json.nil?
      json = JSON.parse(json)  if json.is_a?(String)

      buffer = "".html_safe

      if json["list"] # legacy format
        json["list"].each do |widget_source|
          widget = RecursiveOpenStruct.new(widget_source, recurse_over_arrays: true)
          next  unless template_exists?(widget.type)

          buffer << render_card_to_string(widget)
        end
      else # MobileDoc
        json["sections"][1].each do |section|
          card_name = section[1].sub('-', '_')
          payload = section[2]

          card_data = {
            type: card_name,
            data: payload
          }

          next unless template_exists?(card_name)

          card = RecursiveOpenStruct.new(card_data, recurse_over_arrays: true)
          buffer << render_card_to_string(card)
        end
      end

      buffer
    end


    private

    def template_exists?(card_name)
      lookup_context.template_exists?("editorium/_#{card_name}")
    end

    def render_card_to_string(card)
      render("editorium/#{card.type}", layout: false, data: card.data)
    end
  end
end
