require 'securerandom'

class WelcomeController < ApplicationController
  def index
  end

  def licence
    client = KammaClient.new(
      ENV.fetch('KAMMA_API_URL'),
      ENV.fetch('KAMMA_API_KEY'),
      ENV.fetch('KAMMA_MANAGER_ID')
    )
    result = client.check_property(licence_params)

    render json: result.as_json
  end

  private

  def licence_params
    par = params.required(:data).permit(:postcode, :address_1, :address_2, :address_3, :address_4)
    par[:reference] = SecureRandom.uuid
    par
  end
end
