from django.shortcuts import render,HttpResponse
# from django.views import View

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

# 更新UID展柜信息
class Update(APIView):
    
    def post(self,request):
        import requests
        uid = request.data['uid']
        url = "https://enka.network/u/"+uid+"/__data.json"
        response = requests.get(url=url)
        dataList = response.json()
        return Response(dataList)