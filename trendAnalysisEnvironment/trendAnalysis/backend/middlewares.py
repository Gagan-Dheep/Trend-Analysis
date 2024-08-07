from django.shortcuts import redirect
from django.conf import settings 


class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path_info
        print(f"Request path: {path}")
        # print(request.session.items())
        if path == settings.LOGIN_URL or path == '/api/register/':
            print(f"Accessing {path}")
            return self.get_response(request) 

        if self.is_authenticated(request):
            return self.get_response(request)
        else:
            print("User not authenticated, redirecting to login")
            return redirect(settings.LOGIN_URL)

    def is_authenticated(self, request):
        # logged_in = request.session.get('logged_in')
        # print(f"Session 'logged_in': {logged_in}")
        # print(request.session.get('logged_in'))
        return request.session.get('logged_in') 


        