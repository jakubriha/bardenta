#!/usr/bin/env python

import csv

with open('template.html', 'r') as htmlreader, open('src/index.html', 'w') as page_cz, open('src/en.html', 'w') as page_en, open('translations.csv', newline='') as csvreader:
  
  template = htmlreader.read()

  template_cz = template
  template_en = template

  translations = csv.DictReader(csvreader, delimiter=';')

  for translation in translations:

    if not '${' + translation['key'] + '}' in template:
      print('WARNING: Key ' + translation['key'] + ' does not exist in the template.')

    template_cz = template_cz.replace('${' + translation['key'] + '}', translation['cz'])
    template_en = template_en.replace('${' + translation['key'] + '}', translation['en'])

  page_cz.write(template_cz)
  page_en.write(template_en)

print('The following pages were succesfully generated:')
print('')
print('  src/en.html')
print('  src/index.html')