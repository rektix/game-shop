from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import *
from django.db.models import Avg, Count, Sum
import json

# Create your views here.
def home(request):
    query = request.GET.get('name')

    fieldname = 'genre'
    games_per_genre = Game.objects.values(fieldname).order_by(fieldname).annotate(count=Count(fieldname))
    games_per_genre = [[x['genre'], x['count']] for x in games_per_genre]

    per_day = Purchase.objects.extra(select={'day': 'date( date )'}).values('day').annotate(day_sum=Sum('game__price')).order_by('day')
    per_day = [[x['day'].strftime('%d.%m.%Y'), x['day_sum']] for x in per_day]
    per_day.insert(0, ['Date', 'Sales in $'])

    top_5 = Purchase.objects.values('game__name').annotate(count=Count('game')).order_by('-count')[:5]
    print(top_5)

    return render(request, 'main/index.html', { 'gamesPerGenre': json.dumps(games_per_genre), 'moneyPerDay': json.dumps(per_day), 'topGames': top_5 })
