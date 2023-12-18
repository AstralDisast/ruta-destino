<script lang="ts">
	// Importación de módulos y bibliotecas necesarios
	import { onMount, onDestroy, getContext } from 'svelte';
	import L from 'leaflet';

	// Declaración de variables de estado
	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	let open = false;

	// Obtención del objeto de capa (layer) del contexto
	const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext('layer');
	const layer = getLayer();

	// Función ejecutada después de que el componente es montado en el DOM
	onMount(() => {
		// Creación de un objeto de ventana emergente (popup)
		popup = L.popup().setContent(popupElement);

		if (layer) {
			// Vinculación del popup a la capa y manejo de eventos
			layer.bindPopup(popup);
			layer.on('popupopen', () => (open = true));
			layer.on('popupclose', () => (open = false));
		}
	});

	// Función ejecutada antes de que el componente sea destruido
	onDestroy(() => {
		layer?.unbindPopup(); // Desvinculación del popup al destruir el componente
		popup?.remove(); // Eliminación del popup al destruir el componente
		popup = undefined;
	});
</script>

<!-- Elemento div que contendrá el contenido del popup y se enlaza con la variable popupElement -->
<div bind:this={popupElement}>
	<!-- Renderización del contenido del slot si la ventana emergente está abierta -->
	{#if open}
		<slot />
	{/if}
</div>
