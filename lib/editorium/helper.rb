module Editorium
  module Helper
    include ActionView::Helpers::FormHelper
    include ActionView::Helpers::SanitizeHelper

    def editorium_input(object_name, method, options = {})
      rendered_value  = options[:value] || ''
      source_value    = options[:source] || ''
      base_id = "#{object_name}_#{method}"
      service_url = Editorium.try(:configuration).try(:service_url) || 'http://localhost:4200'

      react_component 'EditoriumInput', {
        prerender: true,

        objectName: object_name,
        method: method,
        renderedValue: rendered_value,
        sourceValue: source_value,
        serviceURL: service_url
      }
    end
  end
end
