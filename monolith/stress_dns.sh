#!/bin/bash

# Parámetros de configuración
DNS_SERVER_IP="192.168.0.9"     # Dirección IP del servidor BIND
DNS_SERVER_PORT="53"          # Puerto del servidor BIND
QUERY_FILE="dns_queries.txt"  # Archivo de consultas DNS
NUM_QUERIES=100000              # Número total de consultas a enviar
QPS=100                # Consultas por segundo

# Genera consultas DNS de ejemplo y guarda en un archivo
cat <<EOF >$QUERY_FILE
www.example.com A
example.com MX
mail.example.com AAAA
www.google.com A
www.youtube.com A
www.facebook.com A
www.amazon.com A
www.twitter.com A
www.instagram.com A
www.linkedin.com A
www.microsoft.com A
www.apple.com A
www.wikipedia.org A
EOF

# Ejecuta dnsperf para realizar el test de estrés
dnsperf -s $DNS_SERVER_IP -p $DNS_SERVER_PORT -l $NUM_QUERIES -q $QPS -d $QUERY_FILE

# Elimina el archivo de consultas
rm $QUERY_FILE
