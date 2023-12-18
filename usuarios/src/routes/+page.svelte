<script lang="ts">
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/server/Leaflet.svelte';
	import Marker from '$lib/server/Marker.svelte';
	import Popup from '$lib/server/Leaflet.svelte'

	const initialView: LatLngExpression = [-37.4713, -72.3482]; // Los Angeles, Chile
	const markerLocations: Array<LatLngExpression> = [
		[-37.467165, -72.347487] // Terminal de buses isla jacob
	];
    const terminals = [
        { name: 'Isla Jacob', coordinates: [-37.467165, -72.347487] },
        { name: 'Santa Rita', coordinates: [-37.467714, -72.347417] },
        { name: 'Buses Rurales Vega Techada', coordinates: [-37.466185, -72.346945] }
    ];
    let selectedTerminal: LatLngExpression | undefined;

    // Función para manejar el cambio en la selección del destino
    function handleDestinationChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selectedOption = select.options[select.selectedIndex];
        const terminalIndex = parseInt(selectedOption.value, 10);
        selectedTerminal = terminals[terminalIndex]?.coordinates;
    }
</script>

<div class="w-full h-screen">
    <div class="w-full h-screen">
        <Leaflet view={initialView} zoom={14}>
            {#each markerLocations as latLng}
                <Marker {latLng} width={40} height={40}>
                    <!-- ShipBit Icon -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xml:space="preserve"
                        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
                        viewBox="0 0 45 40"
                    >
                        <path
                            d="m23.046 25.449 9.601 16.885H13.253l9.793-16.885ZM45 23.965H25.702l9.575 16.84L45 23.965ZM44.963 20.923 35.339 4.254l-9.668 16.669h19.292ZM32.771 2.618h-4.17L8.522 37.237l2.08 3.603L32.771 2.618ZM25.084 2.618H11.465L0 22.476l6.768 11.722 18.316-31.58Z"
                            style="fill:#e9204f;fill-rule:nonzero"
                            transform="translate(0 -2.618)"
                        />
                    </svg>
    
                    <Popup
                        >Like & Subscribe! This is a very loooooooooooong title and it has many characters.</Popup
                    >
                </Marker>
            {/each}
        </Leaflet>
    </div>
    <h1 class="text-center">Rutas</h1>
    <section class="page-section bg-light" id="Rutes">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Quieres aventurarte?</h2>
                <h3 class="section-subheading text-muted">Elige un destino a ojos cerrados y descubre nuevos lugares!</h3>
            </div>
            <div class="row text-center">
                <div class="col-md-4">
                    <div class=" form-group">
                        <!-- Route input-->
                        <select class="form-select" on:change={handleDestinationChange}>
                            <option selected>Selecciona una destino </option>
                            {#each terminals as { name, coordinates }, i}
                                <option value={i}>{name}</option>
                            {/each}
                        </select>
                    </div>
                    <select class="form-select" >
                        <option selected>Selecciona una destino </option>
                        <option value="1">Yumbel</option>
                        <option value="2">Cabrero</option>
                        <option value="3">yumbel Estacion</option>
                        <option value="4">Yumbel</option>
                        <option value="5">Cabrero</option>
                        <option value="6">Salto del laja</option>
                        <option value="7">mulchen</option>
                        <option value="8">Nacimiento</option>
                        <option value="9">Coihue</option>
                    </select>
                </div>
            </div>
        </div>
    </section>
</div>

