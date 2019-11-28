<html>

<head>
    @yield('scripts', '')
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @if (env('COOKIE_EXPIRE'))
        <meta name="cookie-expire" content="{{ env('COOKIE_EXPIRE') }}">
    @endif

    <!-- Fonts -->
    <link rel="stylesheet" type="text/css" href="/vendor/webchat/fonts/fonts.min.css" />
</head>

<body>

<div id="app">
    <opendialog-chat></opendialog-chat>
</div>

<link rel="stylesheet" type="text/css" href="/vendor/webchat/css/app.css?{{env("CSS_VERSION", "v1")}}">

@if (env('CUSTOM_CSS_PATH'))
    <link rel="stylesheet" type="text/css" href="{{ env('CUSTOM_CSS_PATH') }}">
@endif

<script>
    window.openDialogSettings = {
        url: "{{ env("APP_URL") }}",
        user: {
            first_name: '{!! auth()->user() ? auth()->user()->name : '' !!}',
            last_name: '',
            email: '{!! auth()->user() ? auth()->user()->email : '' !!}',
            external_id: '{!! auth()->user() ? auth()->user()->id : '' !!}',
        },
    };
</script>

<script src="/vendor/webchat/js/app.js?{{env("JS_VERSION", "v1")}}"></script>

<script src="/vendor/webchat/js/opendialog-bot-full.js?{{env("JS_VERSION", "v1")}}"></script>

</body>

</html>
