package com.cityandvillage

interface Downloader {
    fun downloadFile(url:String,mimeType:String,title:String):Long
}