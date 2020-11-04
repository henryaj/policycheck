require 'faraday'
class KammaClient
  ATTEMPT_LIMIT = 3

  def initialize(api_url, api_key, manager_id)
    @api_key = api_key
    @manager_id = manager_id
    @token = nil
    @conn = Faraday.new(
      url: api_url,
      headers: {'Content-Type' => 'application/json'}
    )

    self.authorize!
  end

  def check_property(params, attempt=0)
    raise if attempt > ATTEMPT_LIMIT

    params = params.to_h
    payload = {
      'property': params['reference'],
      'address_1': params['address_1'],
      'postcode': params['postcode'],
      'token': @token
    }

    if params['address_2']
      payload.merge({'address_2': params['address_2']})
    end

    if params['address_3']
      payload.merge({'address_3': params['address_3']})
    end

    if params['address_4']
      payload.merge({'address_4': params['address_4']})
    end

    res = @conn.post('property/process') {|req| req.body = payload.to_json}
    body = JSON.parse(res.body)
    if res.success?
      return body.except('api_id')
    else
      if body['error_type'] == 'authentication'
        self.authorize!
        return self.check_property(params, attempt+1)
      end

      raise Exception
    end
  end

  private

  def authorize!
    res = @conn.post('auth/manager/' + @manager_id) do |req|
      req.params['secret'] = @api_key
    end

    @token = JSON.parse(res.body).fetch('token')
  end
end

