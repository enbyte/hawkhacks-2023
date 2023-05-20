import csv, json

data = list(csv.reader(open('media bias.csv')))[1:]
d = {}
for row in data:
    d[row[0]] = row[1:]
print(json.dumps(d))