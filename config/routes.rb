Rails.application.routes.draw do
  root 'welcome#index'
  post 'licence', to: 'welcome#licence'
end
