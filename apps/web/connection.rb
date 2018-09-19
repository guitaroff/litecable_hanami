module Web
  class Connection < LiteCable::Connection::Base
    identified_by :user, :sid

    def connect
      @user = 'guest'
      @sid = request.params["sid"]
      reject_unauthorized_connection unless @user
      Hanami::Logger.new.info "#{@user} connected"
    end

    def disconnect
      Hanami::Logger.new.info "#{@user} disconnected"
    end
  end
end
