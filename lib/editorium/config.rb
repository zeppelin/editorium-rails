module Editorium
  class << self
    attr_accessor :configuration
  end

  def self.configure
    self.configuration ||= Configuration.new
    yield configuration if block_given?
  end

  class Configuration
    attr_accessor :service_url, :preview_layout

    def initialize
      @service_url = ENV['EDITORIUM_URL'] || 'http://editorium.herokuapp.com'
      @preview_layout = false
    end
  end
end
