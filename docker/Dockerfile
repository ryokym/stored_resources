FROM composer as composer
COPY ./composer.json /app
RUN composer install --ignore-platform-reqs --no-scripts

FROM centos:7
RUN yum -y update && yum -y install epel-release
RUN rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
RUN yum -y --enablerepo=remi,remi-php72 install \
    httpd \
    php \
    php-cli \
    php-common \
    php-mbstring \
    php-xml \
    php-xmlrpc

RUN ln -sf /etc/mime.types /etc/httpd/conf/mime.types
RUN cp -p /usr/share/zoneinfo/Japan /etc/localtime
COPY ./src /var/www/html
COPY ./docker/auth/ /var/www/auth/
RUN chmod 666 /var/www/auth/*.txt
RUN mkdir -p /var/www/log
RUN chmod 003 /var/www/log
COPY --from=composer /app/vendor /var/www/html/vendor
CMD ["/usr/sbin/httpd","-D","FOREGROUND"]
