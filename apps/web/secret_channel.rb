module Web
  class SecretChannel < Channel
    identifier :secret_channel

    def subscribed
      stream_from "secret_channel"
    end
  end
end
