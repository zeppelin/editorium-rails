module Editorium
  class << self
    attr_accessor :configuration
  end

  def self.configure
    self.configuration ||= Configuration.new
    yield configuration if block_given?
  end

  class Configuration
    attr_accessor :service_url

    def initialize
      @service_url = 'http://localhost:4200'
    end
  end
end
