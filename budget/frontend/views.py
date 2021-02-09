from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.

# Since django doesn't send CSRF Cookie without django templates or login
# ensure_csrf_cookie is necessary to use


@ensure_csrf_cookie
def index(request):
    return render(request, 'frontend/index.html')
